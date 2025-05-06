interface ErrorDetails {
  message: string;
  stack?: string;
  componentName?: string;
  additionalInfo?: Record<string, any>;
}

class ErrorTracker {
  private static instance: ErrorTracker;
  private errors: ErrorDetails[] = [];
  private readonly maxErrors = 100;

  private constructor() {
    this.setupGlobalHandlers();
  }

  public static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  private setupGlobalHandlers(): void {
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
      });
    });

    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        stack: event.error?.stack,
      });
    });
  }

  public logError(error: ErrorDetails): void {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...error,
    };

    console.error('Error logged:', errorEntry);
    
    // In development, we'll just log to console
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    // In production, we would send to an error tracking service
    this.errors = [errorEntry, ...this.errors].slice(0, this.maxErrors);
    
    // Here you would typically send to your error tracking service
    // Example: Sentry.captureException(error);
  }

  public getRecentErrors(): ErrorDetails[] {
    return [...this.errors];
  }

  public clearErrors(): void {
    this.errors = [];
  }
}

// Create a simple hook for components to use
export const useErrorTracking = () => {
  const errorTracker = ErrorTracker.getInstance();

  return {
    logError: (error: ErrorDetails) => errorTracker.logError(error),
    getRecentErrors: () => errorTracker.getRecentErrors(),
    clearErrors: () => errorTracker.clearErrors(),
  };
};

// Export singleton instance
export const errorTracker = ErrorTracker.getInstance();

// Error boundary helper
export const logErrorBoundary = (error: Error, componentStack: string, componentName?: string) => {
  errorTracker.logError({
    message: error.message,
    stack: error.stack,
    componentName,
    additionalInfo: { componentStack },
  });
};