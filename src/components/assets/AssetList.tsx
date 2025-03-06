import React, { useState } from "react";
import { Asset } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AssetListProps {
  assets: Asset[];
}

const AssetList = ({ assets }: AssetListProps) => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-status-success";
      case "inactive":
        return "bg-status-neutral";
      case "maintenance":
        return "bg-status-warning";
      case "retired":
        return "bg-status-danger";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="flex gap-6">
      {/* Asset List */}
      <div className="w-2/3 grid grid-cols-1 gap-4">
        {assets.map((asset) => (
          <Card
            key={asset.id}
            className={`overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${selectedAsset?.id === asset.id ? 'border-primary' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setSelectedAsset(asset);
            }}
            onDoubleClick={() => navigate(`/assets/${asset.id}`)}
          >
            <div className="flex p-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                {asset.image ? (
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted rounded">
                    <span className="text-muted-foreground text-sm">No image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 ml-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg line-clamp-1">{asset.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {asset.model || 'No model'} • {asset.manufacturer || 'No manufacturer'}
                    </p>
                  </div>
                  <Badge className={getStatusBadgeClass(asset.status)}>
                    {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-2" />
                    <span className="truncate">{asset.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 mr-2" />
                    <span>Last: {formatDate(asset.lastInspection)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Asset Details */}
      <div className="w-1/3">
        {selectedAsset ? (
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <p className="text-muted-foreground">{selectedAsset.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Asset Types</h3>
                  <Badge variant="outline" className="mr-2">{selectedAsset.category}</Badge>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Location</h3>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedAsset.location}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Criticality</h3>
                  <Badge className={getStatusBadgeClass(selectedAsset.status)}>
                    {selectedAsset.status.charAt(0).toUpperCase() + selectedAsset.status.slice(1)}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Next Inspection</h3>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{formatDate(selectedAsset.nextInspection)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-[400px]">
              <Info className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Asset Selected</h3>
              <p className="text-muted-foreground">
                Select an asset from the list to view its details
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AssetList;