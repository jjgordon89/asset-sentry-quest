
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import AssetFilters from "@/components/assets/AssetFilters";
import AssetPageHeader from "@/components/assets/AssetPageHeader";
import AssetTabFilter from "@/components/assets/AssetTabFilter";
import AssetContent from "@/components/assets/AssetContent";
import { useAssets } from "@/hooks/useAssets";
import { useNavigate } from "react-router-dom";

const Assets: React.FC = () => {
  const navigate = useNavigate();
  const { 
    filteredAssets, 
    isLoading, 
    activeTab,
    handleSearch, 
    handleFilterChange, 
    handleTabChange 
  } = useAssets();

  return (
    <PageTransition>
      <div className="pt-20 pb-16 container">
        <AssetPageHeader 
          title="Assets" 
          description="Manage and track all your assets" 
        />

        <AssetFilters 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange}
          onAddNew={() => navigate("/assets/new")}
        />

        <AssetTabFilter 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />

        <AssetContent 
          isLoading={isLoading} 
          filteredAssets={filteredAssets} 
        />
      </div>
    </PageTransition>
  );
};

export default Assets;
