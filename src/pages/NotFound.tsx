import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Box } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="mb-12"
          >
            <div className="relative w-48 h-48 mx-auto mb-8">
              {/* Animated Box */}
              <motion.div
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0"
              >
                <Box className="w-full h-full text-primary-600" />
              </motion.div>
              
              {/* 404 Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-5xl font-bold text-primary-900">404</span>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-4 text-gray-900"
            >
              Page Not Found
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 mb-8"
            >
              Oops! The page you're looking for seems to have been packed away.
              Let's get you back to the right place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/"
                className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors duration-300"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>

          {/* Additional Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 text-gray-600"
          >
            <Link to="/products" className="hover:text-primary-600 transition-colors">
              View Products
            </Link>
            <Link to="/contact" className="hover:text-primary-600 transition-colors">
              Contact Support
            </Link>
            <Link to="/request-quote" className="hover:text-primary-600 transition-colors">
              Request Quote
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;