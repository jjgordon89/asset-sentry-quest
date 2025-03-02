
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import { Inspection } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, PlusCircle, X } from "lucide-react";
import InspectionCard from "@/components/inspections/InspectionCard";

const Inspections = () => {
  const navigate = useNavigate();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [filteredInspections, setFilteredInspections] = useState<Inspection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // Simulate data loading
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const dummyInspections: Inspection[] = [
        {
          id: "1",
          assetId: "asset1",
          assetName: "Forklift #A102",
          inspectionType: "Monthly Safety Check",
          date: "2023-04-15",
          completedBy: "John Doe",
          status: "completed",
          items: [
            {
              id: "item1",
              question: "Are all safety features functional?",
              status: "pass",
              priority: null,
              notes: null,
            },
            {
              id: "item2",
              question: "Is the hydraulic system working properly?",
              status: "pass",
              priority: null,
              notes: null,
            },
            {
              id: "item3",
              question: "Is the horn working?",
              status: "fail",
              priority: "medium",
              notes: "Horn is not loud enough, needs adjustment",
            },
          ],
          notes: "Overall in good condition, horn needs to be fixed",
          photos: ["https://via.placeholder.com/300"],
        },
        {
          id: "2",
          assetId: "asset2",
          assetName: "Air Compressor #C55",
          inspectionType: "Quarterly Maintenance",
          date: "2023-03-01",
          completedBy: "Jane Smith",
          status: "completed",
          items: [
            {
              id: "item1",
              question: "Oil change completed?",
              status: "pass",
              priority: null,
              notes: null,
            },
            {
              id: "item2",
              question: "Filters replaced?",
              status: "pass",
              priority: null,
              notes: null,
            },
          ],
          notes: "All maintenance tasks completed",
          photos: [],
        },
        {
          id: "3",
          assetId: "asset3",
          assetName: "Generator #G20",
          inspectionType: "Monthly Operational Test",
          date: "2023-05-10",
          completedBy: "Mike Johnson",
          status: "in-progress",
          items: [
            {
              id: "item1",
              question: "Does generator start properly?",
              status: "fail",
              priority: "high",
              notes: "Generator fails to start consistently",
            },
            {
              id: "item2",
              question: "Is fuel level adequate?",
              status: "pass",
              priority: null,
              notes: null,
            },
          ],
          notes: "Generator starting issues, needs service",
          photos: [],
        },
        {
          id: "4",
          assetId: "asset4",
          assetName: "Pallet Jack #P44",
          inspectionType: "Annual Inspection",
          date: "2023-05-20",
          completedBy: "Pending",
          status: "pending",
          items: [
            {
              id: "item1",
              question: "Are wheels in good condition?",
              status: "na",
              priority: null,
              notes: null,
            },
            {
              id: "item2",
              question: "Do hydraulics function properly?",
              status: "na",
              priority: null,
              notes: null,
            },
          ],
          notes: null,
          photos: [],
        },
      ];

      setInspections(dummyInspections);
      setFilteredInspections(dummyInspections);
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    filterInspections(searchQuery, activeTab);
  }, [searchQuery, activeTab, inspections]);

  const filterInspections = (query: string, tab: string) => {
    let filtered = [...inspections];
    
    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        inspection =>
          inspection.assetName.toLowerCase().includes(lowercaseQuery) ||
          inspection.inspectionType.toLowerCase().includes(lowercaseQuery) ||
          inspection.completedBy.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Filter by tab/status
    if (tab !== "all") {
      filtered = filtered.filter(inspection => inspection.status === tab);
    }
    
    setFilteredInspections(filtered);
  };

  return (
    <PageTransition>
      <div className="pt-20 pb-16 container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inspections</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track asset inspections
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0"
            onClick={() => navigate("/inspections/new")}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Inspection
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <div className="relative w-full md:w-auto md:flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inspections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <Tabs 
          defaultValue="all" 
          className="mb-8"
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-muted mb-4"></div>
              <div className="h-4 w-32 bg-muted rounded"></div>
            </div>
          </div>
        ) : filteredInspections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInspections.map((inspection) => (
              <InspectionCard key={inspection.id} inspection={inspection} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <h3 className="text-lg font-medium mb-2">No inspections found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search" : "Start by creating your first inspection"}
            </p>
            <Button onClick={() => navigate("/inspections/new")}>
              Create New Inspection
            </Button>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Inspections;
