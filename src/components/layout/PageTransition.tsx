import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ 
        opacity: 0,
        y: 20,
        filter: 'blur(10px)'
      }}
      animate={{ 
        opacity: 1,
        y: 0,
        filter: 'blur(0px)'
      }}
      exit={{ 
        opacity: 0,
        y: -20,
        filter: 'blur(10px)'
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="min-h-screen"
    >
      {/* Overlay for page transitions */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50 bg-gray-950"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.645, 0.045, 0.355, 1]
        }}
        style={{ originY: 1 }}
      />

      {/* Loading indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-teal-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        style={{ originX: 0 }}
      />

      {children}

      {/* Exit overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50 bg-gray-950"
        initial={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.645, 0.045, 0.355, 1]
        }}
        style={{ originY: 0 }}
      />
    </motion.div>
  );
};

export default PageTransition;