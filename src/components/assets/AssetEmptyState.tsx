
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AssetEmptyState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <h3 className="text-lg font-medium mb-2">No assets found</h3>
      <p className="text-muted-foreground mb-4">
        Try adjusting your search or filters
      </p>
      <Button onClick={() => navigate("/assets/new")}>
        Add New Asset
      </Button>
    </div>
  );
};

export default AssetEmptyState;
