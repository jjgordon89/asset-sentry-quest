
import React from "react";
import AssetList from "./AssetList";
import AssetEmptyState from "./AssetEmptyState";
import AssetLoadingState from "./AssetLoadingState";
import { Asset } from "@/types";
import { AlertTriangle } from "lucide-react";

interface AssetContentProps {
  isLoading: boolean;
  filteredAssets: Asset[];
  error?: string | null;
}

const AssetContent: React.FC<AssetContentProps> = ({ isLoading, filteredAssets, error }) => {
  if (isLoading) {
    return <AssetLoadingState />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertTriangle className="h-12 w-12 text-status-danger mb-4" />
        <h3 className="text-lg font-medium mb-2">Error loading assets</h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (filteredAssets.length === 0) {
    return <AssetEmptyState />;
  }
  
  return <AssetList assets={filteredAssets} />;
};

export default AssetContent;
