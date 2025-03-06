import { AssetError } from '@/services/api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ErrorToastProps = {
  error: Error | null;
  onRetry?: () => void;
};

export const ErrorToast = ({ error, onRetry }: ErrorToastProps) => (
  <Alert variant="destructive" className="w-[350px]" role="alert">
    <AlertCircle className="h-4 w-4" aria-hidden="true" />
    <AlertTitle>{
      error instanceof AssetError ? error.errorCode : 'Application Error'
    }</AlertTitle>
    <AlertDescription className="mt-2">
      {error?.message || 'An unexpected error occurred'}
      {(error instanceof AssetError ? error.retryable : error?.message) && (
        <Button
          variant="outline"
          size="sm"
          className="mt-2 ml-auto"
          onClick={onRetry}
          aria-label="Retry last action"
        >
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          Retry
        </Button>
      )}
    </AlertDescription>
  </Alert>
);