
import React from "react";

const AssetLoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 rounded-full bg-muted mb-4"></div>
        <div className="h-4 w-32 bg-muted rounded"></div>
      </div>
    </div>
  );
};

export default AssetLoadingState;
