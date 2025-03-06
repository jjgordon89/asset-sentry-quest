import { Component, ErrorInfo, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    console.error('Error Boundary caught:', error, errorInfo);
    
    if (!this.state.error) {
      toast.error('Application Error', {
        description: error.message || 'An unexpected error occurred',
        action: {
          label: 'Reload',
          onClick: () => window.location.reload()
        }
      });
    }
  }

  render() {
    if (this.state.hasError) {
      console.error('Error Boundary caught:', this.state.error, this.state.errorInfo);
      

      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Something went wrong!
          </h2>
          <p className="text-red-700 mb-4">
            {this.state.error?.toString()}
          </p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}