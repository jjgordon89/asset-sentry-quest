
import { AssetStatistics } from "@/types";
import { 
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Package,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface AssetStatsProps {
  stats: AssetStatistics;
}

const AssetStats = ({ stats }: AssetStatsProps) => {
  const navigate = useNavigate();

  const handleNavigateToAssets = () => {
    navigate("/assets");
  };

  const statCards = [
    {
      title: "Total Assets",
      value: stats.total,
      icon: <Package className="h-5 w-5 text-primary" />,
      color: "bg-primary/10",
      onClick: handleNavigateToAssets,
      isClickable: true,
    },
    {
      title: "Active Assets",
      value: stats.active,
      icon: <CheckCircle2 className="h-5 w-5 text-status-success" />,
      color: "bg-status-success/10",
      onClick: null,
      isClickable: false,
    },
    {
      title: "In Maintenance",
      value: stats.maintenance,
      icon: <Activity className="h-5 w-5 text-status-warning" />,
      color: "bg-status-warning/10",
      onClick: null,
      isClickable: false,
    },
    {
      title: "Inspections Due",
      value: stats.inspectionsDue,
      icon: <Clock className="h-5 w-5 text-status-info" />,
      color: "bg-status-info/10",
      onClick: null,
      isClickable: false,
    },
    {
      title: "Inspections Overdue",
      value: stats.inspectionsOverdue,
      icon: <AlertTriangle className="h-5 w-5 text-status-danger" />,
      color: "bg-status-danger/10",
      onClick: null,
      isClickable: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {statCards.map((stat, index) => (
        <Card 
          key={index} 
          className={`border shadow-card transition-all duration-300 hover:shadow-card-hover overflow-hidden ${stat.isClickable ? 'cursor-pointer hover:border-primary/50' : ''}`}
          onClick={stat.onClick}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
              {stat.isClickable && (
                <ArrowRight className="h-4 w-4 text-primary" />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AssetStats;
