
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import PageTransition from "@/components/layout/PageTransition";
import { Asset, Inspection } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Clipboard,
  Edit,
  FileText,
  Info,
  MapPin,
  Package,
  Trash2,
  AlertTriangle,
  ArrowLeft,
  History,
  Banknote,
  Tag,
  QrCode,
  Barcode,
} from "lucide-react";
import InspectionCard from "@/components/inspections/InspectionCard";

const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchData = async () => {
      try {
        // Simulated API response for development
        const mockAsset = {
          id: id || "1",
          name: "Forklift #A102",
          description: "Standard warehouse forklift with 5000lb capacity",
          serialNumber: "FL-5000-102",
          model: "FL5000",
          manufacturer: "Heavy Lifters Inc",
          category: "machinery",
          purchaseDate: "2020-03-15",
          purchasePrice: 25000,
          location: "Warehouse A",
          department: "Logistics",
          status: "active",
          lastInspection: "2023-04-15",
          nextInspection: "2023-05-15",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=400",
          notes: "Regular maintenance required every 3 months",
          qrCode: "https://via.placeholder.com/150",
          barcode: "https://via.placeholder.com/150"
        };

        const mockInspections = [
          {
            id: "1",
            assetId: id || "1",
            assetName: "Forklift #A102",
            inspectionType: "Monthly Safety Check",
            date: "2023-04-15",
            completedBy: "John Doe",
            status: "completed",
            items: []
          }
        ];

        if (!abortController.signal.aborted) {
          setAsset(mockAsset);
          setInspections(mockInspections);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!asset) return <div>Asset not found</div>;

  return (
    <ErrorBoundary>
      <PageTransition>
        <div className="container mx-auto py-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{asset.name}</CardTitle>
                <CardDescription>{asset.description}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </PageTransition>
    </ErrorBoundary>
  );
};

export default AssetDetails;
