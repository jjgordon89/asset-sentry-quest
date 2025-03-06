
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { inspectionsApi, ApiError } from "@/services/api";
import PageTransition from "@/components/layout/PageTransition";
import { Inspection } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, PlusCircle, X } from "lucide-react";
import InspectionCard from "@/components/inspections/InspectionCard";

export const Inspections = () => {
  const navigate = useNavigate();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [filteredInspections, setFilteredInspections] = useState<Inspection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchInspections = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const data = await inspectionsApi.getInspections({ signal: abortController.signal });
        
        if (!abortController.signal.aborted) {
          setInspections(data);
          setFilteredInspections(data);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          const errorMessage = error instanceof ApiError 
            ? error.message 
            : 'Failed to fetch inspections. Please try again later.';
          setError(errorMessage);
          console.error('Failed to fetch inspections:', error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchInspections();
    return () => abortController.abort();
  }, []);

  const filterInspections = useCallback((query: string, tab: string) => {
    let filtered = [...inspections];
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        inspection =>
          inspection.assetName.toLowerCase().includes(lowercaseQuery) ||
          inspection.inspectionType.toLowerCase().includes(lowercaseQuery) ||
          inspection.completedBy.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    if (tab !== "all") {
      filtered = filtered.filter(inspection => inspection.status === tab);
    }
    
    return filtered;
  }, [inspections]);
  
  const filteredResults = useMemo(() => {
    return filterInspections(searchQuery, activeTab);
  }, [filterInspections, searchQuery, activeTab]);
  
  useEffect(() => {
    setFilteredInspections(filteredResults);
  }, [filteredResults]);
  
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

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-destructive/15 text-destructive p-4 rounded-lg">
            <p>{error}</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
              <div className="relative w-full md:w-auto md:flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inspections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {filteredInspections.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No inspections found</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredInspections.map((inspection) => (
                  <InspectionCard key={inspection.id} inspection={inspection} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </PageTransition>
  );
};

export default Inspections;
