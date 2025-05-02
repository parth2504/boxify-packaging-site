import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
    backgroundColor: '#222831'
  },
  enter: {
    opacity: 1,
    x: 0,
    backgroundColor: '#222831',
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    backgroundColor: '#222831',
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-dark"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;