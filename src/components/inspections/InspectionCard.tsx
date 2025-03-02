
import { Inspection } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  ClipboardCheck,
  User
} from "lucide-react";

interface InspectionCardProps {
  inspection: Inspection;
}

const InspectionCard = ({ inspection }: InspectionCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-status-success text-white";
      case "pending":
        return "bg-status-warning text-white";
      case "in-progress":
        return "bg-status-info text-white";
      default:
        return "bg-status-neutral text-white";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getFailedItemsCount = () => {
    return inspection.items.filter(item => item.status === 'fail').length;
  };

  const hasHighPriorityItems = () => {
    return inspection.items.some(item => item.priority === 'high');
  };

  return (
    <Link to={`/inspections/${inspection.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-card-hover border hover:border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg leading-tight">{inspection.inspectionType}</h3>
              <p className="text-sm text-muted-foreground">
                {inspection.assetName}
              </p>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(inspection.status)}`}>
              {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
            </div>
          </div>
          
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              <span>{formatDate(inspection.date)}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <User className="h-3.5 w-3.5 mr-1.5" />
              <span>{inspection.completedBy}</span>
            </div>
            <div className="flex items-center">
              <ClipboardCheck className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              <span>
                <span className="text-muted-foreground">{inspection.items.length} items checked</span>
                {getFailedItemsCount() > 0 && (
                  <span className="ml-2 text-status-danger font-medium">
                    ({getFailedItemsCount()} failed)
                  </span>
                )}
              </span>
            </div>
          </div>
          
          {hasHighPriorityItems() && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="text-xs px-2 py-1 rounded-full bg-priority-high text-white inline-flex items-center">
                <span>High Priority Issues</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default InspectionCard;
