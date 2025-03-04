
import { useState } from "react";
import SearchInput from "./SearchInput";
import FilterSection from "./FilterSection";
import AddAssetButton from "./AddAssetButton";

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
}: AssetFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const handleSearchChange = (query: string) => {
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
      <SearchInput 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />

      <div className="flex flex-wrap gap-3 ml-auto">
        <FilterSection
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
          locationFilter={locationFilter}
          onFilterChange={handleFilterChange}
        />

        <AddAssetButton />
      </div>
    </div>
  );
};

export default AssetFilters;
