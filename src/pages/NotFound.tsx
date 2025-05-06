import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Box } from 'lucide-react';

// 404 illustration
const NOT_FOUND_IMAGE = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&q=80&w=1200';

const NotFound = () => {
  return (
    <section className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-teal-400">404</span> - Page Not Found
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-lg">
              Oops! It seems like the box you're looking for has been misplaced. Let's get you back on track.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/"
                className="inline-flex items-center px-8 py-3 bg-teal-500 text-gray-900 rounded-full font-semibold hover:bg-teal-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 bg-gray-800 text-gray-200 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300"
              >
                <Box className="w-5 h-5 mr-2" />
                View Products
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src={NOT_FOUND_IMAGE}
              alt="404 Illustration"
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent rounded-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;