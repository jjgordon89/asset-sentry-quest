
import { ActivityItem } from "@/types";
import { 
  Clock, 
  ClipboardCheck, 
  Wrench, 
  RefreshCw,
  StickyNote
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "inspection":
        return (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <ClipboardCheck className="h-4 w-4 text-primary" />
          </div>
        );
      case "maintenance":
        return (
          <div className="w-8 h-8 rounded-full bg-status-warning/10 flex items-center justify-center">
            <Wrench className="h-4 w-4 text-status-warning" />
          </div>
        );
      case "status-change":
        return (
          <div className="w-8 h-8 rounded-full bg-status-info/10 flex items-center justify-center">
            <RefreshCw className="h-4 w-4 text-status-info" />
          </div>
        );
      case "note":
        return (
          <div className="w-8 h-8 rounded-full bg-status-neutral/10 flex items-center justify-center">
            <StickyNote className="h-4 w-4 text-status-neutral" />
          </div>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <Card className="shadow-card transition-all duration-300 hover:shadow-card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 py-3 animate-slide-up border-b last:border-0"
            >
              {getActivityIcon(activity.type)}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="font-medium">{activity.assetName}</span>
                  <span className="mx-1">•</span>
                  <span>{activity.user}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDate(activity.date)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
