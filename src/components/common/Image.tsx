import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageOff } from 'lucide-react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  blur?: boolean;
  aspectRatio?: number;
}

const Image = ({
  src,
  alt,
  fallback = 'https://placehold.co/600x400/1a202c/e2e8f0?text=Image+Not+Found',
  blur = true,
  aspectRatio,
  className = '',
  ...props
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    setCurrentSrc(fallback);
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio: `${aspectRatio}` } : undefined}
    >
      {/* Loading Skeleton */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-800 animate-pulse"
          />
        )}
      </AnimatePresence>

      {/* Actual Image */}
      <motion.img
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          w-full h-full object-cover
          ${blur && isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'}
          transition-all duration-300
        `}
        loading="lazy"
        decoding="async"
        {...props}
      />

      {/* Error State */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center
              bg-gray-900/90 text-gray-400 p-4 text-center"
          >
            <ImageOff className="w-8 h-8 mb-2" />
            <p className="text-sm">Failed to load image</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Image;