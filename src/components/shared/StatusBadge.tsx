import React from "react";

type StatusType = 'success' | 'warning' | 'info' | 'danger' | 'neutral';

interface StatusBadgeProps {
  status: string;
  label?: string;
  className?: string;
}

const StatusBadge = ({ status, label, className = '' }: StatusBadgeProps) => {
  const getStatusColor = (status: string): StatusType => {
    switch (status.toLowerCase()) {
      case "completed":
      case "active":
      case "success":
        return "success";
      case "pending":
      case "maintenance":
      case "warning":
        return "warning";
      case "in-progress":
      case "info":
        return "info";
      case "retired":
      case "danger":
      case "fail":
        return "danger";
      default:
        return "neutral";
    }
  };

  const getColorClasses = (type: StatusType): string => {
    switch (type) {
      case "success":
        return "bg-status-success text-white";
      case "warning":
        return "bg-status-warning text-white";
      case "info":
        return "bg-status-info text-white";
      case "danger":
        return "bg-status-danger text-white";
      case "neutral":
      default:
        return "bg-status-neutral text-white";
    }
  };

  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);
  const statusType = getStatusColor(status);
  const colorClasses = getColorClasses(statusType);

  return (
    <div className={`text-xs px-2 py-1 rounded-full ${colorClasses} ${className}`}>
      {displayLabel}
    </div>
  );
};

export default StatusBadge;
export type { StatusBadgeProps };