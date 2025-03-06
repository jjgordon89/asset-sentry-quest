/**
 * API Service
 * 
 * This service handles all API requests to the backend.
 * It provides a clean interface for fetching data and handles error cases.
 */

import { Asset, AssetStatistics, Inspection, ActivityItem } from '@/types';
import { toast } from 'sonner';

// Base API URL - replace with your actual API endpoint in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Error types
export class AssetError extends Error {
  public readonly errorCode: string;
  public readonly statusCode: number;
  public readonly retryable: boolean;
  public readonly context?: Record<string, unknown>;

  constructor(
    errorCode: string, 
    message: string,
    statusCode: number,
    options: { retryable?: boolean; context?: Record<string, unknown> } = {}
  ) {
    super(message);
    this.name = 'AssetError';
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.retryable = options.retryable ?? false;
    this.context = options.context;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON() {
    return {
      errorCode: this.errorCode,
      message: this.message,
      statusCode: this.statusCode,
      retryable: this.retryable,
      context: this.context
    };
  }
}

export class AssetApiError extends AssetError {
  constructor(message: string, statusCode: number, context?: Record<string, unknown>) {
    super('API_ERROR', message, statusCode, {
      retryable: statusCode >= 500,
      context
    });
  }
}

export class AssetNetworkError extends AssetError {
  constructor() {
    super(
      'NETWORK_ERROR', 
      'Network error occurred. Please check your internet connection.',
      0,
      { retryable: true }
    );
  }
}

export class AssetValidationError extends AssetError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('VALIDATION_ERROR', message, 400, { context });
  }
}

// Generic API request function
// Cache configuration
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Enhanced API request function with caching
// Cache invalidation function
const invalidateCache = (endpoint: string) => {
  const cacheKeys = Array.from(cache.keys());
  cacheKeys.forEach(key => {
    if (key.includes(endpoint)) {
      cache.delete(key);
    }
  });
};

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Enhanced API request function with retries
export async function apiRequest<T>(
  endpoint: string,
  method: string = 'GET',
  data?: any,
  options: RequestInit = {}
): Promise<T> {
  const cacheKey = `${method}:${endpoint}`;
  
  // Check cache for GET requests
  if (method === 'GET') {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data as T;
    }
  }

  let lastError: Error | null = null;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const token = getAuthToken();
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        ...(data ? { body: JSON.stringify(data) } : {}),
        ...options,
        headers,
      });

      const result = await handleResponse<T>(response);
      
      // Cache successful GET requests
      if (method === 'GET') {
        cache.set(cacheKey, { data: result, timestamp: Date.now() });
      } else if (method !== 'GET') {
        // Invalidate cache for non-GET requests
        invalidateCache(endpoint);
      }

      return result;
    } catch (error) {
      lastError = error as Error;
      if (error instanceof ApiError && error.status >= 500) {
        // Only retry on server errors
        if (attempt < MAX_RETRIES - 1) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (attempt + 1)));
          continue;
        }
      }
      break;
    }
  }

  if (lastError instanceof ApiError) {
    // Log API errors for monitoring
    console.error(`API Error: ${lastError.message}`, {
      endpoint,
      method,
      status: lastError.status,
      data: lastError.data,
      retryAttempts: MAX_RETRIES
    });
    throw lastError;
  }
  const networkError = new NetworkError('Network error occurred. Please check your connection.');
toast.error(networkError.message);
throw networkError;
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP error! status: ${response.status}`
      }));
      toast.error('API Request Failed', {
        description: errorData.message || 'An unexpected error occurred',
        action: {
          label: 'Retry',
          onClick: () => window.location.reload()
        }
      });
      throw new Error(errorData.message || 'Request failed');
    }
    return await response.json();
  } catch (error) {
    toast.error('Network Error', {
      description: (error as Error).message || 'Failed to connect to the server'
    });
    console.error('API call failed:', error);
    throw error;
  }
  return response.json() as Promise<T>;
}

// Get auth token from secure storage
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}



// Assets API
export const assetsApi = {
  // Get all assets
  getAssets: () => apiRequest<Asset[]>('/assets'),
  
  // Get a single asset by ID
  getAsset: (id: string) => apiRequest<Asset>(`/assets/${id}`),
  
  // Create a new asset
  createAsset: (asset: Omit<Asset, 'id'>) => 
    apiRequest<Asset>('/assets', 'POST', asset),
  
  // Update an existing asset
  updateAsset: (id: string, asset: Partial<Asset>) => 
    apiRequest<Asset>(`/assets/${id}`, 'PUT', asset),
  
  // Delete an asset
  deleteAsset: (id: string) => 
    apiRequest<void>(`/assets/${id}`, 'DELETE'),
  
  // Get asset statistics
  getAssetStatistics: () => 
    apiRequest<AssetStatistics>('/assets/statistics'),
};

// Inspections API
export const inspectionsApi = {
  // Get all inspections
  getInspections: () => 
    apiRequest<Inspection[]>('/inspections'),
  
  // Get inspections for a specific asset
  getAssetInspections: (assetId: string) => 
    apiRequest<Inspection[]>(`/assets/${assetId}/inspections`),
  
  // Get a single inspection
  getInspection: (id: string) => 
    apiRequest<Inspection>(`/inspections/${id}`),
  
  // Create a new inspection
  createInspection: (inspection: Inspection) => 
    apiRequest<Inspection>('/inspections', 'POST', inspection),
  
  // Update an inspection
  updateInspection: (id: string, inspection: Partial<Inspection>) => 
    apiRequest<Inspection>(`/inspections/${id}`, 'PUT', inspection),
};

// Activity API
export const activityApi = {
  // Get recent activity
  getRecentActivity: (limit: number = 10) => 
    apiRequest<ActivityItem[]>(`/activity?limit=${limit}`),
  
  // Get activity for a specific asset
  getAssetActivity: (assetId: string) => 
    apiRequest<ActivityItem[]>(`/assets/${assetId}/activity`),
};

// Mock data implementation for development
import { mockAssets, mockStatistics, mockActivity, mockInspections } from './mockData';
// Enable mock data when API key is not provided or in development mode
export const useMockData = !import.meta.env.VITE_API_KEY || import.meta.env.DEV;

// Mock data service that mimics the API service interface
export const mockApi = {
  assets: mockAssets,
  statistics: mockStatistics,
  inspections: mockInspections,
  activity: mockActivity,
};