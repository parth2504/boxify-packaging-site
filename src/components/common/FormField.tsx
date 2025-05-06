import { forwardRef, ReactNode, ComponentPropsWithoutRef } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface FormFieldProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
  success?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  as?: 'input' | 'textarea' | 'select';
  helperText?: string;
  required?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({
  label,
  error,
  success,
  isLoading,
  icon,
  as = 'input',
  helperText,
  className = '',
  required,
  ...props
}, ref) => {
  const id = props.id || props.name || label.toLowerCase().replace(/\s+/g, '-');
  const Component = as;

  const baseInputStyles = `
    w-full px-4 py-3 bg-gray-900/50 rounded-lg
    border text-gray-100 placeholder-gray-400
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const getInputStyles = () => {
    if (error) {
      return 'border-red-500 focus:border-red-500 focus:ring-red-500';
    }
    if (success) {
      return 'border-green-500 focus:border-green-500 focus:ring-green-500';
    }
    return 'border-gray-700 focus:border-teal-500 focus:ring-teal-500 hover:border-gray-600';
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-200"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">*</span>
        )}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <Component
          {...props}
          ref={ref as any}
          id={id}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={`${id}-${error ? 'error' : 'helper'}`}
          className={`
            ${baseInputStyles}
            ${getInputStyles()}
            ${icon ? 'pl-10' : ''}
            ${className}
          `}
        />

        {/* Status Icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading && (
            <LoadingSpinner size={20} color="currentColor" />
          )}
          {!isLoading && error && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-red-500"
            >
              <AlertCircle className="w-5 h-5" />
            </motion.div>
          )}
          {!isLoading && success && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-green-500"
            >
              <CheckCircle className="w-5 h-5" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          id={`${id}-error`}
          className="text-sm text-red-500"
          role="alert"
        >
          {error}
        </motion.p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p
          id={`${id}-helper`}
          className="text-sm text-gray-400"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;