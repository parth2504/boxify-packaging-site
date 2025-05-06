import { Component, ReactNode, ErrorInfo } from 'react';
import { logErrorBoundary } from '../../utils/errorTracking';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logErrorBoundary(error, errorInfo.componentStack, this.props.componentName);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[300px] flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 
                flex items-center justify-center">
                <AlertTriangle size={32} />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-100 mb-2">
              Something went wrong
            </h2>
            
            <p className="text-gray-400 mb-6">
              An error occurred while rendering this component. 
              We've been notified and will fix this as soon as possible.
            </p>

            <div className="flex justify-center gap-4">
              <Button
                onClick={() => window.location.reload()}
                variant="secondary"
              >
                Refresh Page
              </Button>
              
              <Button
                onClick={this.handleReset}
                variant="primary"
              >
                Try Again
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 p-4 bg-gray-900/50 rounded-lg text-left">
                <p className="text-sm font-mono text-red-400 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;