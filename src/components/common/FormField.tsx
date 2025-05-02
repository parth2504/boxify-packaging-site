import { InputHTMLAttributes, ReactNode, forwardRef, ElementType, ComponentPropsWithRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

type ElementProps<T extends ElementType> = ComponentPropsWithRef<T>;

type BaseInputProps = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

interface FormFieldProps extends Omit<BaseInputProps, 'ref'> {
  label: string;
  error?: string;
  textarea?: boolean;
  as?: 'input' | 'textarea' | 'select';
  success?: boolean;
  icon?: ReactNode;
  isLoading?: boolean;
  children?: React.ReactNode;
  rows?: number;
}

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, FormFieldProps>(
  ({ label, error, textarea, as = 'input', success, icon, isLoading, className = '', children, rows, onChange, ...props }, ref) => {    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (onChange) {
        if (as === 'select') {
          onChange(e as ChangeEvent<HTMLSelectElement>);
        } else if (textarea) {
          onChange(e as ChangeEvent<HTMLTextAreaElement>);
        } else {
          onChange(e as ChangeEvent<HTMLInputElement>);
        }
      }
    };

    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-dark">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-gray">
              {icon}
            </div>
          )}
          
          {as === 'select' ? (
            <select
              {...(props as ElementProps<'select'>)}
              ref={ref as React.Ref<HTMLSelectElement>}
              onChange={handleChange}
              className={`
                w-full px-4 py-2 rounded-lg border bg-light transition-all duration-200
                ${icon ? 'pl-10' : ''}
                ${error ? 'border-red-500 focus:ring-red-500' : 
                  success ? 'border-primary focus:ring-primary' : 
                  'border-dark-gray/20 focus:ring-primary'
                }
                ${isLoading ? 'bg-light/50 cursor-not-allowed' : ''}
                focus:outline-none focus:ring-2 focus:ring-offset-0
                disabled:opacity-60 disabled:cursor-not-allowed
                placeholder-dark-gray/50
                ${className}
              `}
              disabled={isLoading || props.disabled}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? `${props.name}-error` : undefined}
            >
              {children}
            </select>
          ) : textarea ? (
            <textarea
              {...(props as ElementProps<'textarea'>)}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              rows={rows}
              onChange={handleChange}
              className={`
                w-full px-4 py-2 rounded-lg border bg-light transition-all duration-200
                ${icon ? 'pl-10' : ''}
                ${error ? 'border-red-500 focus:ring-red-500' : 
                  success ? 'border-primary focus:ring-primary' : 
                  'border-dark-gray/20 focus:ring-primary'
                }
                ${isLoading ? 'bg-light/50 cursor-not-allowed' : ''}
                focus:outline-none focus:ring-2 focus:ring-offset-0
                disabled:opacity-60 disabled:cursor-not-allowed
                placeholder-dark-gray/50
                ${className}
              `}
              disabled={isLoading || props.disabled}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? `${props.name}-error` : undefined}
            />
          ) : (
            <input
              {...props}
              ref={ref as React.Ref<HTMLInputElement>}
              onChange={handleChange}
              className={`
                w-full px-4 py-2 rounded-lg border bg-light transition-all duration-200
                ${icon ? 'pl-10' : ''}
                ${error ? 'border-red-500 focus:ring-red-500' : 
                  success ? 'border-primary focus:ring-primary' : 
                  'border-dark-gray/20 focus:ring-primary'
                }
                ${isLoading ? 'bg-light/50 cursor-not-allowed' : ''}
                focus:outline-none focus:ring-2 focus:ring-offset-0
                disabled:opacity-60 disabled:cursor-not-allowed
                placeholder-dark-gray/50
                ${className}
              `}
              disabled={isLoading || props.disabled}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? `${props.name}-error` : undefined}
            />
          )}

          <AnimatePresence>
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
              >
                <LoadingSpinner size={20} color="#00ADB5" />
              </motion.div>
            ) : (error || success) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute right-3 top-1/2 -translate-y-1/2
                  ${error ? 'text-red-500' : 'text-primary'}`}
              >
                {error ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-sm"
              id={`${props.name}-error`}
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;