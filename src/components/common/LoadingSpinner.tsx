import { memo } from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
}

const LoadingSpinner = ({ 
  size = 24, 
  color = 'currentColor',
  thickness = 2 
}: LoadingSpinnerProps) => {
  return (
    <div 
      className="inline-block"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          initial={{ pathLength: 0.3, opacity: 0.3 }}
          animate={{ 
            pathLength: [0.3, 0.7, 0.3],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.svg>
    </div>
  );
};

export default memo(LoadingSpinner);