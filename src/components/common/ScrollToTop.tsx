import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Reset scroll position on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Show/hide button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 p-3 rounded-full bg-teal-500 text-gray-900
            shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 
            focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900
            transition-colors duration-200 z-50"
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-6 h-6" />
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white"
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{
              scale: 2,
              opacity: 0,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;