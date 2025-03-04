
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AssetTabFilterProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const AssetTabFilter: React.FC<AssetTabFilterProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs 
      defaultValue={activeTab} 
      className="mb-8"
      onValueChange={onTabChange}
    >
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="inactive">Inactive</TabsTrigger>
        <TabsTrigger value="retired">Retired</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AssetTabFilter;
