
import { useState, useEffect } from "react";
import { Asset } from "@/types";
import { assetsApi, useMockData, mockApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  // Fetch assets from API or use mock data
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchAssets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let data: Asset[];
        
        if (useMockData) {
          // Use mock data with a delay to simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          data = mockApi.assets;
        } else {
          // Use real API
          data = await assetsApi.getAssets();
        }
        
        if (!abortController.signal.aborted) {
          setAssets(data);
          setFilteredAssets(data);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.error('Failed to fetch assets:', err);
          setError(err instanceof Error ? err : new Error('Unknown error'));
          toast({
            title: 'Error',  // Simplified error title
            description: err instanceof Error ? err.message : 'Failed to load assets',
            variant: 'destructive',
          });
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchAssets();
    return () => abortController.abort();
  }, []);

  const handleSearch = (query: string) => {
    filterAssets(query, activeTab);
  };

  const handleFilterChange = (filters: { status?: string; category?: string; location?: string }) => {
    const { status, category, location } = filters;
    
    let filtered = [...assets];
    
    if (status) {
      filtered = filtered.filter(asset => asset.status === status);
    } else if (activeTab !== "all") {
      filtered = filtered.filter(asset => asset.status === activeTab);
    }
    
    if (category) {
      filtered = filtered.filter(asset => asset.category === category);
    }
    
    if (location) {
      filtered = filtered.filter(asset => asset.location === location);
    }
    
    setFilteredAssets(filtered);
  };

  const filterAssets = (query: string, tab: string) => {
    let filtered = [...assets];
    
    // Add null checks for asset properties
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        asset =>
          asset.name?.toLowerCase().includes(lowercaseQuery) ||
          asset.serialNumber?.toLowerCase().includes(lowercaseQuery) ||
          asset.manufacturer?.toLowerCase().includes(lowercaseQuery) ||
          asset.model?.toLowerCase().includes(lowercaseQuery) ||
          asset.location?.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Filter by tab/status
    if (tab !== "all") {
      filtered = filtered.filter(asset => asset.status === tab);
    }
    
    setFilteredAssets(filtered);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterAssets("", value);
  };
  return {
    error,  // Expose error state
    assets,
    filteredAssets: filteredAssets || [],  // Ensure array fallback
    isLoading,
    activeTab,
    handleSearch,
    handleFilterChange,
    handleTabChange
  };
};
