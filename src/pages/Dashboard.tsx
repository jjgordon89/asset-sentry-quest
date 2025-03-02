
import { useState, useEffect } from "react";
import PageTransition from "@/components/layout/PageTransition";
import AssetStats from "@/components/dashboard/AssetStats";
import RecentActivity from "@/components/dashboard/RecentActivity";
import StatusChart from "@/components/dashboard/StatusChart";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AssetStatistics, ActivityItem, Inspection } from "@/types";
import { Clock, PlusCircle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InspectionCard from "@/components/inspections/InspectionCard";

const Dashboard = () => {
  const [stats, setStats] = useState<AssetStatistics>({
    total: 0,
    active: 0,
    maintenance: 0,
    inactive: 0,
    retired: 0,
    inspectionsDue: 0,
    inspectionsOverdue: 0,
  });

  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [upcomingInspections, setUpcomingInspections] = useState<Inspection[]>([]);

  // Simulate data loading
  useEffect(() => {
    // In a real app, these would be API calls
    setTimeout(() => {
      setStats({
        total: 143,
        active: 98,
        maintenance: 21,
        inactive: 15,
        retired: 9,
        inspectionsDue: 17,
        inspectionsOverdue: 5,
      });

      setActivities([
        {
          id: "1",
          type: "inspection",
          date: "2023-05-15T10:30:00",
          assetId: "asset1",
          assetName: "Forklift #A102",
          description: "Completed monthly safety inspection",
          user: "John Doe",
        },
        {
          id: "2",
          type: "maintenance",
          date: "2023-05-14T14:45:00",
          assetId: "asset2",
          assetName: "Air Compressor #C55",
          description: "Scheduled maintenance completed",
          user: "Jane Smith",
        },
        {
          id: "3",
          type: "status-change",
          date: "2023-05-14T09:15:00",
          assetId: "asset3",
          assetName: "Generator #G20",
          description: "Status changed from 'Active' to 'Maintenance'",
          user: "Mike Johnson",
        },
        {
          id: "4",
          type: "note",
          date: "2023-05-13T16:20:00",
          assetId: "asset4",
          assetName: "Pallet Jack #P44",
          description: "Added note about hydraulic fluid leak",
          user: "Sarah Williams",
        },
        {
          id: "5",
          type: "inspection",
          date: "2023-05-13T11:30:00",
          assetId: "asset5",
          assetName: "Safety Harness #SH15",
          description: "Failed quarterly inspection - needs replacement",
          user: "James Brown",
        },
      ]);

      setUpcomingInspections([
        {
          id: "1",
          assetId: "asset1",
          assetName: "Forklift #A102",
          inspectionType: "Monthly Safety Check",
          date: "2023-05-20",
          completedBy: "Pending",
          status: "pending",
          items: [
            {
              id: "item1",
              question: "Are all safety features functional?",
              status: "na",
              priority: null,
              notes: null,
            },
            {
              id: "item2",
              question: "Is the hydraulic system working properly?",
              status: "na",
              priority: null,
              notes: null,
            },
          ],
          notes: null,
          photos: [],
        },
        {
          id: "2",
          assetId: "asset2",
          assetName: "Air Compressor #C55",
          inspectionType: "Quarterly Maintenance",
          date: "2023-05-25",
          completedBy: "Pending",
          status: "pending",
          items: [
            {
              id: "item1",
              question: "Are pressure gauges working correctly?",
              status: "na",
              priority: null,
              notes: null,
            },
            {
              id: "item2",
              question: "Does the compressor reach adequate pressure?",
              status: "na",
              priority: null,
              notes: null,
            },
          ],
          notes: null,
          photos: [],
        },
        {
          id: "3",
          assetId: "asset3",
          assetName: "Generator #G20",
          inspectionType: "Monthly Operational Test",
          date: "2023-05-18",
          completedBy: "Pending",
          status: "pending",
          items: [
            {
              id: "item1",
              question: "Does generator start properly?",
              status: "na",
              priority: null,
              notes: null,
            },
            {
              id: "item2",
              question: "Is fuel level adequate?",
              status: "na",
              priority: null,
              notes: null,
            },
          ],
          notes: null,
          photos: [],
        },
      ]);
    }, 500);
  }, []);

  return (
    <PageTransition>
      <div className="pt-20 pb-16 container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of your assets and inspection activities
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
            <Button asChild variant="outline">
              <Link to="/inspections/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Inspection
              </Link>
            </Button>
            <Button asChild>
              <Link to="/assets/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Asset
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <AssetStats stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentActivity activities={activities} />
            <StatusChart stats={stats} />
          </div>

          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                Upcoming Inspections
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/inspections" className="text-sm">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingInspections.map((inspection) => (
                  <InspectionCard key={inspection.id} inspection={inspection} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
