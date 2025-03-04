
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AssetFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: {
    status?: string;
    category?: string;
    location?: string;
  }) => void;
  onAddNew?: () => void;
}

const AssetFilters = ({
  onSearch,
  onFilterChange,
  onAddNew,
}: AssetFiltersProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (field: string, value: string) => {
    let newFilters: { status?: string; category?: string; location?: string } = {
      status: statusFilter,
      category: categoryFilter,
      location: locationFilter,
    };

    switch (field) {
      case "status":
        setStatusFilter(value);
        newFilters.status = value;
        break;
      case "category":
        setCategoryFilter(value);
        newFilters.category = value;
        break;
      case "location":
        setLocationFilter(value);
        newFilters.location = value;
        break;
    }

    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, serial number..."
          className="pl-10"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-wrap gap-3 ml-auto">
        <Select
          value={statusFilter}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="retired">Retired</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={categoryFilter}
          onValueChange={(value) => handleFilterChange("category", value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="machinery">Machinery</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="tools">Tools</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={locationFilter}
          onValueChange={(value) => handleFilterChange("location", value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="Warehouse A">Warehouse A</SelectItem>
            <SelectItem value="Workshop B">Workshop B</SelectItem>
            <SelectItem value="Facility Exterior">Facility Exterior</SelectItem>
            <SelectItem value="Equipment Room">Equipment Room</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={() => navigate("/assets/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Asset
        </Button>
      </div>
    </div>
  );
};

export default AssetFilters;
