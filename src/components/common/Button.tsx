import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variants = {
  primary: `
    bg-teal-500 text-gray-900 
    hover:bg-teal-600 
    focus:ring-teal-500/50
    disabled:bg-teal-500/50
  `,
  secondary: `
    bg-gray-800 text-gray-100 
    hover:bg-gray-700 
    focus:ring-gray-700/50
    disabled:bg-gray-800/50
  `,
  outline: `
    bg-transparent border-2 border-current
    text-teal-400 hover:text-teal-300
    hover:bg-teal-500/5 
    focus:ring-teal-500/50
    disabled:text-teal-500/50
  `
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center justify-center
        rounded-full font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-offset-gray-900
        disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="ml-2">Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="mr-2 -ml-1">{leftIcon}</span>
          )}
          {children}
          {rightIcon && (
            <span className="ml-2 -mr-1">{rightIcon}</span>
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;