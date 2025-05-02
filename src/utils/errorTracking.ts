interface ErrorEvent {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: number;
  url: string;
}

class ErrorTracker {
  private static instance: ErrorTracker;
  private errors: ErrorEvent[] = [];
  private readonly maxErrors = 50;

  private constructor() {
    this.setupGlobalHandlers();
  }

  public static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  private setupGlobalHandlers() {
    window.onerror = (message, url, line, column, error) => {
      this.captureError({
        message: `${message} (${line}:${column})`,
        stack: error?.stack,
        timestamp: Date.now(),
        url: url || window.location.href
      });
      return false;
    };

    window.onunhandledrejection = (event) => {
      this.captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        timestamp: Date.now(),
        url: window.location.href
      });
    };
  }

  public captureError(error: ErrorEvent) {
    this.errors.unshift(error);
    
    // Keep only the last maxErrors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error captured:', error);
    }

    // Here you would typically send the error to your error tracking service
    this.sendToErrorService(error);
  }

  private sendToErrorService(error: ErrorEvent) {
    // Implementation for sending to error tracking service like Sentry
    // For now, we'll just store it locally
    try {
      localStorage.setItem('lastError', JSON.stringify(error));
    } catch (e) {
      console.error('Failed to store error:', e);
    }
  }

  public getRecentErrors(): ErrorEvent[] {
    return [...this.errors];
  }

  public clearErrors() {
    this.errors = [];
    try {
      localStorage.removeItem('lastError');
    } catch (e) {
      console.error('Failed to clear errors:', e);
    }
  }
}

export const errorTracker = ErrorTracker.getInstance();

// React error boundary helper
export const logErrorToService = (error: Error, componentStack: string) => {
  errorTracker.captureError({
    message: error.message,
    stack: error.stack,
    componentStack,
    timestamp: Date.now(),
    url: window.location.href
  });
};