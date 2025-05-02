import { createContext, useContext, ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

const toastTypeConfig = {
  success: {
    icon: CheckCircle,
    className: 'bg-primary text-light border-primary-600',
  },
  error: {
    icon: AlertCircle,
    className: 'bg-dark text-light border-dark-gray',
  },
  info: {
    icon: Info,
    className: 'bg-dark-gray text-light border-dark',
  },
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 space-y-2"
        role="log"
        aria-live="polite"
        aria-label="Notification"
      >
        <AnimatePresence mode="sync">
          {toasts.map(toast => {
            const ToastIcon = toastTypeConfig[toast.type].icon;
            
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`
                  flex items-center p-4 rounded-lg shadow-lg border
                  ${toastTypeConfig[toast.type].className}
                  max-w-md w-full
                `}
              >
                <ToastIcon className="w-5 h-5 shrink-0" />
                <p className="mx-3 text-sm font-medium">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="ml-auto shrink-0 hover:opacity-75 transition-opacity"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};