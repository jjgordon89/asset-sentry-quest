
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddAsset = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assetData, setAssetData] = useState({
    assetType: "",
    location: "",
    area: "",
    hoistNumber: "",
    serialNumber: "",
    status: "active",
    date: new Date().toISOString().split('T')[0],
    description: "",
    // Attributes
    type: "",
    capacity: "",
    power: "",
    craneOEM: "",
    hoistConfiguration: "",
    liftingMedium: "",
    controlType: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssetData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setAssetData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to a database
    console.log("Asset data to save:", assetData);
    
    toast({
      title: "Asset added successfully",
      description: `${assetData.assetType} has been added to your assets.`,
    });
    
    navigate("/assets");
  };

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

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Asset</h1>
            <p className="text-muted-foreground mt-1">
              Enter details for the new asset
            </p>
          </div>
          <Button onClick={handleSubmit} className="mt-4 md:mt-0">
            <Save className="mr-2 h-4 w-4" />
            Save Asset
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="assetType">Asset Type</Label>
                      <Select 
                        name="assetType" 
                        onValueChange={(value) => handleSelectChange("assetType", value)}
                        defaultValue={assetData.assetType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overhead_crane">Overhead Crane</SelectItem>
                          <SelectItem value="gantry_crane">Gantry Crane</SelectItem>
                          <SelectItem value="jib_crane">Jib Crane</SelectItem>
                          <SelectItem value="hoist">Hoist</SelectItem>
                          <SelectItem value="forklift">Forklift</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select 
                        name="location" 
                        onValueChange={(value) => handleSelectChange("location", value)}
                        defaultValue={assetData.location}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="building_a">Building A</SelectItem>
                          <SelectItem value="building_b">Building B</SelectItem>
                          <SelectItem value="warehouse">Warehouse</SelectItem>
                          <SelectItem value="yard">Yard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="area">Area</Label>
                      <Input
                        id="area"
                        name="area"
                        value={assetData.area}
                        onChange={handleInputChange}
                        placeholder="e.g. Shipping, Production"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hoistNumber">Hoist Number</Label>
                      <Input
                        id="hoistNumber"
                        name="hoistNumber"
                        value={assetData.hoistNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. 6479277299"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serialNumber">Serial Number</Label>
                      <Input
                        id="serialNumber"
                        name="serialNumber"
                        value={assetData.serialNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. KW50107"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        name="status" 
                        onValueChange={(value) => handleSelectChange("status", value)}
                        defaultValue={assetData.status}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">In Service</SelectItem>
                          <SelectItem value="inactive">Out of Service</SelectItem>
                          <SelectItem value="maintenance">Under Maintenance</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={assetData.date}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={assetData.description}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Enter asset description"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-xl font-semibold mt-8 mb-4">Attributes</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select 
                        name="type" 
                        onValueChange={(value) => handleSelectChange("type", value)}
                        defaultValue={assetData.type}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bridge">Bridge</SelectItem>
                          <SelectItem value="monorail">Monorail</SelectItem>
                          <SelectItem value="gantry">Gantry</SelectItem>
                          <SelectItem value="jib">Jib</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        name="capacity"
                        value={assetData.capacity}
                        onChange={handleInputChange}
                        placeholder="e.g. 20 Tons"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="power">Power</Label>
                      <Input
                        id="power"
                        name="power"
                        value={assetData.power}
                        onChange={handleInputChange}
                        placeholder="e.g. 230V-3Ph-60Hz"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="craneOEM">Crane OEM</Label>
                      <Input
                        id="craneOEM"
                        name="craneOEM"
                        value={assetData.craneOEM}
                        onChange={handleInputChange}
                        placeholder="e.g. Gaffey"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hoistConfiguration">Hoist Configuration</Label>
                      <Input
                        id="hoistConfiguration"
                        name="hoistConfiguration"
                        value={assetData.hoistConfiguration}
                        onChange={handleInputChange}
                        placeholder="e.g. Main & Aux"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="liftingMedium">Lifting Medium</Label>
                      <Input
                        id="liftingMedium"
                        name="liftingMedium"
                        value={assetData.liftingMedium}
                        onChange={handleInputChange}
                        placeholder="e.g. Wire Rope"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="controlType">Control Type</Label>
                      <Input
                        id="controlType"
                        name="controlType"
                        value={assetData.controlType}
                        onChange={handleInputChange}
                        placeholder="e.g. Remote"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-1 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="rounded-lg overflow-hidden bg-muted aspect-square w-full max-w-xs">
                      <img
                        src="/lovable-uploads/6e786c37-e2d3-4cea-b61b-5e32f562c57a.png"
                        alt="Asset preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button className="mt-4" variant="outline">
                      Upload Image
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-medium text-muted-foreground mb-2">QR Code</div>
                    <div className="bg-white p-2 rounded-lg">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Asset" 
                        alt="QR Code" 
                        className="w-32 h-32"
                      />
                    </div>
                    <p className="mt-2 text-sm text-center text-muted-foreground">
                      QR code will be generated when the asset is saved
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </PageTransition>
  );
};

export default AddAsset;
