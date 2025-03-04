
import React from "react";
import FilterSelect from "./FilterSelect";

interface FilterSectionProps {
  statusFilter: string;
  categoryFilter: string;
  locationFilter: string;
  onFilterChange: (field: string, value: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  statusFilter,
  categoryFilter,
  locationFilter,
  onFilterChange,
}) => {
  const statusOptions = [
    { value: "", label: "All" },
    { value: "active", label: "Active" },
    { value: "maintenance", label: "Maintenance" },
    { value: "inactive", label: "Inactive" },
    { value: "retired", label: "Retired" },
  ];

  const categoryOptions = [
    { value: "", label: "All" },
    { value: "machinery", label: "Machinery" },
    { value: "electronics", label: "Electronics" },
    { value: "tools", label: "Tools" },
    { value: "safety", label: "Safety" },
  ];

  const locationOptions = [
    { value: "", label: "All" },
    { value: "Warehouse A", label: "Warehouse A" },
    { value: "Workshop B", label: "Workshop B" },
    { value: "Facility Exterior", label: "Facility Exterior" },
    { value: "Equipment Room", label: "Equipment Room" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      <FilterSelect
        value={statusFilter}
        onChange={(value) => onFilterChange("status", value)}
        options={statusOptions}
        placeholder="Status"
      />

      <FilterSelect
        value={categoryFilter}
        onChange={(value) => onFilterChange("category", value)}
        options={categoryOptions}
        placeholder="Category"
      />

      <FilterSelect
        value={locationFilter}
        onChange={(value) => onFilterChange("location", value)}
        options={locationOptions}
        placeholder="Location"
      />
    </div>
  );
};

export default FilterSection;
