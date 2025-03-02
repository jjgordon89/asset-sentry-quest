
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  // Simulate data loading
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const dummyAsset: Asset = {
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
        barcode: "https://via.placeholder.com/150",
      };

      const dummyInspections: Inspection[] = [
        {
          id: "1",
          assetId: id || "1",
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
          assetId: id || "1",
          assetName: "Forklift #A102",
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
            {
              id: "item3",
              question: "Battery terminals cleaned?",
              status: "pass",
              priority: null,
              notes: null,
            },
          ],
          notes: "All maintenance tasks completed",
          photos: [],
        },
      ];

      setAsset(dummyAsset);
      setInspections(dummyInspections);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-status-success">Active</Badge>;
      case "inactive":
        return <Badge className="bg-status-neutral">Inactive</Badge>;
      case "maintenance":
        return <Badge className="bg-status-warning">Maintenance</Badge>;
      case "retired":
        return <Badge className="bg-status-danger">Retired</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="pt-20 pb-16 container">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-muted mb-4"></div>
            <div className="h-4 w-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="pt-20 pb-16 container">
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Asset not found</h3>
          <p className="text-muted-foreground mb-4">
            The asset you're looking for doesn't exist or has been removed
          </p>
          <Button onClick={() => navigate("/assets")}>Back to Assets</Button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="pt-20 pb-16 container">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="w-full md:w-2/5 lg:w-1/3">
                <div className="rounded-lg overflow-hidden bg-muted aspect-square">
                  <img
                    src={asset.image || "https://via.placeholder.com/400"}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                      {asset.name}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Package className="h-4 w-4" />
                      <span>{asset.manufacturer} {asset.model}</span>
                      {getStatusBadge(asset.status)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {asset.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>
                      <span className="text-muted-foreground">Location: </span>
                      {asset.location}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>
                      <span className="text-muted-foreground">Department: </span>
                      {asset.department}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>
                      <span className="text-muted-foreground">Last Inspection: </span>
                      {formatDate(asset.lastInspection)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>
                      <span className="text-muted-foreground">Next Inspection: </span>
                      {formatDate(asset.nextInspection)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clipboard className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>
                      <span className="text-muted-foreground">Serial Number: </span>
                      {asset.serialNumber}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Banknote className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>
                      <span className="text-muted-foreground">Purchase Price: </span>
                      {formatCurrency(asset.purchasePrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="inspections" className="mt-6">
              <TabsList className="mb-4">
                <TabsTrigger value="inspections">
                  <FileText className="h-4 w-4 mr-2" />
                  Inspections
                </TabsTrigger>
                <TabsTrigger value="history">
                  <History className="h-4 w-4 mr-2" />
                  History
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="inspections" className="animate-slide-up">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Inspection Records</h2>
                  <Button>
                    <Clipboard className="h-4 w-4 mr-2" />
                    New Inspection
                  </Button>
                </div>
                
                {inspections.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inspections.map((inspection) => (
                      <InspectionCard key={inspection.id} inspection={inspection} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No inspections yet</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        This asset doesn't have any inspection records
                      </p>
                      <Button>Create First Inspection</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="history" className="animate-slide-up">
                <Card>
                  <CardHeader>
                    <CardTitle>Asset History</CardTitle>
                    <CardDescription>
                      Track changes and activities related to this asset
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative pl-6 border-l pb-6">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="mb-6 relative">
                          <div className="absolute w-3 h-3 rounded-full bg-primary -left-7.5"></div>
                          <div className="mb-1 text-sm text-muted-foreground">
                            Apr 15, 2023
                          </div>
                          <div className="font-medium">Monthly Inspection Completed</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Completed by: John Doe
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="animate-slide-up">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>
                      Manuals, warranties, and other related documents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No documents yet</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Upload manuals, warranties, or certificates
                      </p>
                      <Button>Upload Document</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="w-full lg:w-1/3 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Info className="h-5 w-5 mr-2 text-muted-foreground" />
                  Asset Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                    <dd className="mt-1">{asset.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Purchase Date</dt>
                    <dd className="mt-1">{formatDate(asset.purchaseDate)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Notes</dt>
                    <dd className="mt-1">{asset.notes || "No notes available"}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            {(asset.qrCode || asset.barcode) && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <QrCode className="h-5 w-5 mr-2 text-muted-foreground" />
                    Identification Codes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {asset.qrCode && (
                    <div className="flex flex-col items-center">
                      <div className="text-sm font-medium text-muted-foreground mb-2">QR Code</div>
                      <img src={asset.qrCode} alt="QR Code" className="w-32 h-32" />
                    </div>
                  )}
                  {asset.barcode && (
                    <div className="flex flex-col items-center">
                      <div className="text-sm font-medium text-muted-foreground mb-2">Barcode</div>
                      <img src={asset.barcode} alt="Barcode" className="w-40 h-20" />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AssetDetails;
