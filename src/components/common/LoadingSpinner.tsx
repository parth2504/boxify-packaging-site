import { memo } from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
  speed?: number;
  className?: string;
}

const LoadingSpinner = ({
  size = 24,
  color = 'currentColor',
  thickness = 2,
  speed = 1.5,
  className = ''
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
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
          duration: speed,
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
          initial={{ pathLength: 0.33 }}
          animate={{
            pathLength: [0.33, 0.66, 0.33],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: speed * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.svg>

      {/* Hide text visually but keep it for screen readers */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default memo(LoadingSpinner);