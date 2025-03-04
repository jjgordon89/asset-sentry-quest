
import React from "react";

interface AssetPageHeaderProps {
  title: string;
  description: string;
}

const AssetPageHeader: React.FC<AssetPageHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

export default AssetPageHeader;
