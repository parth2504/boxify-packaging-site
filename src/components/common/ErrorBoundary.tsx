import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { logErrorToService } from '../../utils/errorTracking';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logErrorToService(error, errorInfo.componentStack || '');
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full bg-dark-gray rounded-2xl p-8 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="w-16 h-16 mx-auto mb-6 text-primary"
            >
              <AlertTriangle className="w-full h-full" />
            </motion.div>

            <h1 className="text-2xl font-bold text-light mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-light/80 mb-6">
              We apologize for the inconvenience. The error has been logged and we'll look into it.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-dark rounded-lg text-left">
                <p className="text-primary font-mono text-sm mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <pre className="text-light/60 text-xs overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            <button
              onClick={this.handleReload}
              className="inline-flex items-center px-6 py-3 bg-primary text-light rounded-full font-medium hover:bg-primary-600 transition-colors duration-300"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Reload Page
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;