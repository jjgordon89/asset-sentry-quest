
export type AssetStatus = 'active' | 'inactive' | 'maintenance' | 'retired';

export type PriorityLevel = 'low' | 'medium' | 'high';

export interface Asset {
  id: string;
  name: string;
  description: string;
  serialNumber: string;
  model: string;
  manufacturer: string;
  category: string;
  purchaseDate: string;
  purchasePrice: number;
  location: string;
  department: string;
  status: AssetStatus;
  lastInspection: string | null;
  nextInspection: string | null;
  image: string | null;
  notes: string | null;
  qrCode?: string;
  barcode?: string;
}

export interface AssetStatistics {
  total: number;
  active: number;
  maintenance: number;
  inactive: number;
  retired: number;
  inspectionsDue: number;
  inspectionsOverdue: number;
}

export interface InspectionItem {
  id: string;
  question: string;
  status: 'pass' | 'fail' | 'na';
  priority: PriorityLevel | null;
  notes: string | null;
}

export interface Inspection {
  id: string;
  assetId: string;
  assetName: string;
  inspectionType: string;
  date: string;
  completedBy: string;
  status: 'completed' | 'pending' | 'in-progress';
  items: InspectionItem[];
  notes: string | null;
  photos: string[];
}

export interface ActivityItem {
  id: string;
  type: 'inspection' | 'maintenance' | 'status-change' | 'note';
  date: string;
  assetId: string;
  assetName: string;
  description: string;
  user: string;
}
