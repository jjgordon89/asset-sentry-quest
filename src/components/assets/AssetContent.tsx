
import React from "react";
import AssetList from "./AssetList";
import AssetEmptyState from "./AssetEmptyState";
import AssetLoadingState from "./AssetLoadingState";
import { Asset } from "@/types";

interface AssetContentProps {
  isLoading: boolean;
  filteredAssets: Asset[];
}

const AssetContent: React.FC<AssetContentProps> = ({ isLoading, filteredAssets }) => {
  if (isLoading) {
    return <AssetLoadingState />;
  }
  
  if (filteredAssets.length === 0) {
    return <AssetEmptyState />;
  }
  
  return <AssetList assets={filteredAssets} />;
};

export default AssetContent;
