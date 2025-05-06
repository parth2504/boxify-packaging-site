import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  const navigate = useNavigate();

  // Log 404 errors for analytics
  useEffect(() => {
    console.error(`404 Error: Page not found - ${window.location.pathname}`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Box */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          animate={{
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Box className="w-full h-full text-teal-400" strokeWidth={1.5} />
          <motion.div
            className="absolute inset-0 text-4xl font-bold text-gray-100
              flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            404
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-gray-100 mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mb-8 max-w-md mx-auto"
        >
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved or doesn't exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            leftIcon={<ArrowLeft className="w-5 h-5" />}
          >
            Go Back
          </Button>

          <Link to="/">
            <Button
              variant="primary"
              leftIcon={<Home className="w-5 h-5" />}
            >
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
          animate={{
            x: [-20, 20],
            y: [-20, 20],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900/95 to-gray-950" />
      </div>
    </div>
  );
};

export default NotFound;