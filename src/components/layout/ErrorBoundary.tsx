import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, RefreshCw } from 'lucide-react';
import { AssetError } from '@/services/api';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  private isAssetError(error: unknown): error is AssetError {
    return error instanceof AssetError;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('Error Boundary caught:', error, errorInfo);
    // TODO: Add error logging service integration
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container max-w-2xl py-12">
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Application Error</AlertTitle>
            <AlertDescription className="space-y-4">
              <p>Something went wrong. Our team has been notified.</p>
              <div className="text-sm text-muted-foreground">
                {this.isAssetError(this.state.error) ? 
                  `Error Code: ${this.state.error.errorCode} - ${this.state.error.message}` :
                  this.state.error?.toString()}
              </div>
              {this.isAssetError(this.state.error) && this.state.error.retryable && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={this.handleReset}
                  className="mt-2"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry Operation
                </Button>
              )}
              <div className="flex gap-2">
                <Button variant="outline" onClick={this.handleReset}>
                  Try Again
                </Button>
                <Button asChild>
                  <a href="/">Return Home</a>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}