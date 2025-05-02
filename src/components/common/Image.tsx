import { ImgHTMLAttributes, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageOff } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Image = ({ src, alt, className = '', fallback, ...props }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Image */}
      <img
        src={error && fallback ? fallback : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          w-full h-full object-cover
          ${isLoading || error ? 'invisible' : 'visible'}
        `}
        {...props}
      />

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-dark/5"
          >
            <LoadingSpinner size={40} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {error && !fallback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-dark/5 text-dark-gray"
          >
            <ImageOff className="w-10 h-10 mb-2" />
            <span className="text-sm">Failed to load image</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Image;