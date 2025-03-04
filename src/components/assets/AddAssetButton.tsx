
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddAssetButton: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Button onClick={() => navigate("/assets/new")}>
      <Plus className="mr-2 h-4 w-4" />
      Add New Asset
    </Button>
  );
};

export default AddAssetButton;
