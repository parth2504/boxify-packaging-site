import { motion } from 'framer-motion';
import { ArrowRight, Box, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

// Add high-quality image URLs
const HERO_BG = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000';

const Hero = () => {
  // Animation variants for staggered appearance of text content
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Delay between child elements
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start hidden and slightly below
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }, // Fade in and slide up
  };

  // Variants for the main Hero Image container entry animation
  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 }, // Start hidden, slightly smaller, and rotated
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 } }, // Fade in, scale up, and un-rotate
  };

  // Variants for the floating elements animation
  const floatingElementVariants = {
    initial: { opacity: 0 },
    animate: {
      y: [-20, 20],
      x: [-15, 15],
      rotate: [0, 360],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut"
      }
    }
  };

  // Variants for the diagonal line animation
  const diagonalLineVariants = {
    hidden: { height: 0, opacity: 0 }, // Start with no height and hidden
    visible: { 
      height: '100%', 
      opacity: 1, 
      transition: { duration: 1.5, ease: 'easeOut', delay: 0.6 } 
    }
  };

  return (
    <section className="relative min-h-screen bg-gray-950 text-gray-100 overflow-hidden flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* High-quality background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/90 to-gray-950 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-[0.03]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight"
            >
              <span className="text-teal-400">Premium</span> Packaging Solutions for Your Business
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-10 max-w-lg"
            >
              We craft exceptional boxes designed to protect, impress, and deliver with confidence. Elevate your brand with packaging that stands out.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              {/* Primary Button */}
              <Link
                to="/request-quote"
                className="inline-flex items-center px-8 py-3 bg-teal-500 text-gray-900 rounded-full font-semibold hover:bg-teal-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              >
                Request Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>

              {/* Secondary Button */}
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 bg-gray-800 text-gray-200 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              >
                View Products
              </Link>
            </motion.div>

            {/* Features */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {[
                { icon: <Box size={24} />, text: 'Custom Sizes & Designs' },
                { icon: <Shield size={24} />, text: 'Superior Quality Materials' },
                { icon: <Truck size={24} />, text: 'Reliable & Fast Delivery' }
              ].map((feature) => (
                <motion.div
                  key={feature.text}
                  variants={itemVariants}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div className="flex-grow">
                     <span className="text-base font-medium text-gray-200">{feature.text}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image and Animations */}
          <motion.div
            variants={imageContainerVariants} // Apply entry animation variants
            initial="hidden"
            animate="visible" // Animate when the component mounts
            className="relative flex items-center justify-center" // Use flex to center content
          >

            {/* Floating Elements Container */}
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"> {/* Container for floating elements, higher z-index, centered */}
                 {/* Floating Element 1 (Box) */}
                <motion.div
                  className="absolute w-16 h-16 text-teal-400 opacity-70" // Position and style
                  style={{ top: '20%', left: '25%' }} // Example positioning
                  variants={floatingElementVariants} // Apply floating animation variants
                  initial={{ opacity: 0 }} // Initial state before animation starts
                  animate="animate" // Start the infinite animation
                >
                  <Box className="w-full h-full" />
                </motion.div>

                 {/* Floating Element 2 (Shield) */}
                <motion.div
                  className="absolute w-12 h-12 text-gray-500 opacity-70" // Position and style
                   style={{ bottom: '25%', right: '20%' }} // Example positioning
                  variants={floatingElementVariants} // Apply floating animation variants
                  initial={{ opacity: 0 }} // Initial state before animation starts
                  animate="animate" // Start the infinite animation
                >
                  <Shield className="w-full h-full" />
                </motion.div>

                 {/* Floating Element 3 (Truck) */}
                 <motion.div
                  className="absolute w-10 h-10 text-teal-600 opacity-70" // Position and style
                  style={{ top: '30%', right: '30%' }} // Example positioning
                  variants={floatingElementVariants} // Apply floating animation variants
                   initial={{ opacity: 0 }} // Initial state before animation starts
                  animate="animate" // Start the infinite animation
                >
                  <Truck className="w-full h-full" />
                </motion.div>
            </div>

            {/* Diagonal Line Decoration */}
            <motion.div
              variants={diagonalLineVariants}
              initial="hidden"
              animate={["visible", "animate"]} // Play entry and then loop animation
              className="absolute top-0 right-0 h-full w-2 bg-teal-500 origin-top-right rotate-12 transform" // Styled and positioned diagonal line
              style={{ transformOrigin: 'top right' }} // Ensure rotation is from the top right
            />

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
