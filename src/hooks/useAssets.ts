
import { useState, useEffect } from "react";
import { Asset } from "@/types";

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // Simulate data loading
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const dummyAssets: Asset[] = [
        {
          id: "1",
          name: "Forklift #A102",
          description: "Standard warehouse forklift with 5000lb capacity",
          serialNumber: "FL-5000-102",
          model: "FL5000",
          manufacturer: "Heavy Lifters Inc",
          category: "machinery",
          purchaseDate: "2020-03-15",
          purchasePrice: 25000,
          location: "Warehouse A",
          department: "Logistics",
          status: "active",
          lastInspection: "2023-04-15",
          nextInspection: "2023-05-15",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=200",
          notes: "Regular maintenance required every 3 months",
        },
        {
          id: "2",
          name: "Air Compressor #C55",
          description: "Industrial air compressor for pneumatic tools",
          serialNumber: "AC-2000-55",
          model: "AC2000",
          manufacturer: "Pressure Pro",
          category: "machinery",
          purchaseDate: "2021-01-10",
          purchasePrice: 12000,
          location: "Workshop B",
          department: "Maintenance",
          status: "maintenance",
          lastInspection: "2023-03-20",
          nextInspection: "2023-06-20",
          image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&h=200",
          notes: "Needs filter replacement",
        },
        {
          id: "3",
          name: "Generator #G20",
          description: "Diesel backup generator for emergency power",
          serialNumber: "GEN-50K-20",
          model: "PowerGen 50K",
          manufacturer: "ElectroPower",
          category: "machinery",
          purchaseDate: "2019-11-05",
          purchasePrice: 35000,
          location: "Facility Exterior",
          department: "Facilities",
          status: "active",
          lastInspection: "2023-04-05",
          nextInspection: "2023-05-05",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&h=200",
          notes: "Requires monthly testing",
        },
        {
          id: "4",
          name: "Pallet Jack #P44",
          description: "Manual pallet jack for warehouse operations",
          serialNumber: "PJ-2000-44",
          model: "PalletMaster 2000",
          manufacturer: "LiftWell",
          category: "tools",
          purchaseDate: "2022-02-18",
          purchasePrice: 1500,
          location: "Warehouse A",
          department: "Logistics",
          status: "inactive",
          lastInspection: "2023-03-01",
          nextInspection: "2023-06-01",
          image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=300&h=200",
          notes: "Hydraulic fluid leak, needs repair",
        },
        {
          id: "5",
          name: "Safety Harness #SH15",
          description: "Fall protection safety harness for working at heights",
          serialNumber: "SH-PRO-15",
          model: "SafetyPro",
          manufacturer: "Heights Protection",
          category: "safety",
          purchaseDate: "2022-06-10",
          purchasePrice: 350,
          location: "Equipment Room",
          department: "Safety",
          status: "retired",
          lastInspection: "2023-04-10",
          nextInspection: null,
          image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=300&h=200",
          notes: "Failed inspection, replaced with newer model",
        },
        {
          id: "6",
          name: "Conference Room Projector",
          description: "4K projector for main conference room",
          serialNumber: "PRJ-4K-001",
          model: "UltraView 4K",
          manufacturer: "VisualTech",
          category: "electronics",
          purchaseDate: "2022-01-15",
          purchasePrice: 2800,
          location: "Conference Room A",
          department: "IT",
          status: "active",
          lastInspection: "2023-02-15",
          nextInspection: "2023-08-15",
          image: null,
          notes: null,
        },
      ];

      setAssets(dummyAssets);
      setFilteredAssets(dummyAssets);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleSearch = (query: string) => {
    filterAssets(query, activeTab);
  };

  const handleFilterChange = (filters: any) => {
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
    
    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        asset =>
          asset.name.toLowerCase().includes(lowercaseQuery) ||
          asset.serialNumber.toLowerCase().includes(lowercaseQuery) ||
          asset.manufacturer.toLowerCase().includes(lowercaseQuery) ||
          asset.model.toLowerCase().includes(lowercaseQuery) ||
          asset.location.toLowerCase().includes(lowercaseQuery)
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
    assets,
    filteredAssets,
    isLoading,
    activeTab,
    handleSearch,
    handleFilterChange,
    handleTabChange
  };
};
