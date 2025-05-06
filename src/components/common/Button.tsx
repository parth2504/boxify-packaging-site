import { forwardRef, ReactNode, ComponentPropsWithRef } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'prefix'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';

  const variants = {
    primary: 'bg-teal-500 text-gray-900 hover:bg-teal-600 focus:ring-teal-500',
    secondary: 'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500',
    outline: 'border-2 border-gray-700 text-gray-100 hover:bg-gray-800 focus:ring-gray-500',
    ghost: 'text-gray-400 hover:text-gray-100 hover:bg-gray-800 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      ref={ref}
      whileHover={!isDisabled ? { scale: 1.02 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner
            className="mr-2"
            size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
          />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className={`mr-2 ${size === 'sm' ? 'text-sm' : ''}`}>
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className={`ml-2 ${size === 'sm' ? 'text-sm' : ''}`}>
              {rightIcon}
            </span>
          )}
        </>
      )}

      {/* Focus ring animation */}
      <motion.span
        className="absolute inset-0 rounded-lg ring-2 ring-current opacity-0"
        initial={false}
        animate={{
          opacity: props['aria-expanded'] ? 0.2 : 0
        }}
      />
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;