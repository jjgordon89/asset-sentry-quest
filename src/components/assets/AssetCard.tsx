
import { Asset } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AssetCardProps {
  asset: Asset;
}

const AssetCard = ({ asset }: AssetCardProps) => {
  const navigate = useNavigate();

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
    <Card 
      className="h-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/assets/${asset.id}`)}
    >
      <div className="relative">
        {asset.image ? (
          <div className="aspect-video bg-muted">
            <img
              src={asset.image}
              alt={asset.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        <Badge 
          className={`absolute top-2 right-2 ${getStatusBadgeClass(asset.status)}`}
        >
          {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{asset.name}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {asset.model} • {asset.manufacturer}
        </p>
        
        <div className="grid grid-cols-1 gap-2 mt-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mr-2" />
            <span className="truncate">{asset.location}</span>
          </div>
          
          {asset.lastInspection && (
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-2" />
              <span>Last: {formatDate(asset.lastInspection)}</span>
            </div>
          )}
          
          {asset.nextInspection && (
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-2" />
              <span>Next: {formatDate(asset.nextInspection)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;
