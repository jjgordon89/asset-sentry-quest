
import { Asset } from "@/types";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

interface AssetCardProps {
  asset: Asset;
}

const AssetCard = ({ asset }: AssetCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-status-success text-white";
      case "inactive":
        return "bg-status-neutral text-white";
      case "maintenance":
        return "bg-status-warning text-white";
      case "retired":
        return "bg-status-danger text-white";
      default:
        return "bg-status-neutral text-white";
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

  const placeholderImage = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=200";

  return (
    <Link to={`/assets/${asset.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-card-hover border hover:border-primary/20 h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden bg-muted">
          <img
            src={asset.image || placeholderImage}
            alt={asset.name}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
          <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${getStatusColor(asset.status)}`}>
            {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
          </div>
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="mb-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-1">{asset.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {asset.manufacturer} - {asset.model}
            </p>
          </div>
          <div className="mt-auto space-y-2 pt-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span className="line-clamp-1">{asset.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              <span>Next inspection: {formatDate(asset.nextInspection)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AssetCard;
