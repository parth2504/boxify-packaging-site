import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: (id: string) => void;
}

const Toast = ({ 
  id, 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose 
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: AlertCircle
  };

  const colors = {
    success: 'bg-green-500 text-green-50',
    error: 'bg-red-500 text-red-50',
    info: 'bg-teal-500 text-teal-50'
  };

  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`
        flex items-center gap-3 p-4 rounded-lg shadow-lg
        ${colors[type]} backdrop-blur-sm
        border border-white/10
      `}
      role="alert"
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="ml-auto p-1 hover:bg-black/10 rounded-full
          transition-colors duration-200"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
        <motion.div
          className="h-full bg-white/20"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{
            duration: duration / 1000,
            ease: 'linear'
          }}
        />
      </div>
    </motion.div>
  );
};

export default Toast;