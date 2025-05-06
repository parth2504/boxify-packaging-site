import { motion } from 'framer-motion';
import { ArrowRight, Box, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

// High-quality background image
const HERO_BG = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000';

const Hero = () => {
  // Animation variants for staggered text appearance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  // Hero image container animation
  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0, 
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 }
    },
  };

  // Floating elements animation
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
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  };

  // Glowing line animation
  const glowLineVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: '100%', 
      opacity: [0, 1, 0.8], 
      transition: { duration: 1.5, ease: 'easeOut', delay: 0.6 } 
    }
  };

  return (
    <section className="relative min-h-screen bg-gray-950 text-gray-100 overflow-hidden flex items-center">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/90 to-gray-950 opacity-90" />
        <motion.div
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-[0.03]"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

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
              <span className="text-teal-400 relative">
                Premium
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-teal-400/30"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>{' '}
              Packaging Solutions for Your Business
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-10 max-w-lg"
            >
              We craft exceptional boxes designed to protect, impress, and deliver with confidence. 
              Elevate your brand with packaging that stands out.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                to="/request-quote"
                className="inline-flex items-center px-8 py-3 bg-teal-500 text-gray-900 rounded-full font-semibold hover:bg-teal-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              >
                Request Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 bg-gray-800 text-gray-200 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              >
                View Products
              </Link>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {[
                { icon: <Box size={24} />, text: 'Custom Sizes & Designs' },
                { icon: <Shield size={24} />, text: 'Superior Quality Materials' },
                { icon: <Truck size={24} />, text: 'Reliable & Fast Delivery' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  variants={itemVariants}
                  className="flex items-start space-x-4"
                  custom={index}
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
            variants={imageContainerVariants}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center"
          >
            {/* Floating Elements */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <motion.div
                className="absolute w-16 h-16 text-teal-400 opacity-70"
                style={{ top: '20%', left: '25%' }}
                variants={floatingElementVariants}
                initial="initial"
                animate="animate"
              >
                <Box className="w-full h-full" />
              </motion.div>

              <motion.div
                className="absolute w-12 h-12 text-gray-500 opacity-70"
                style={{ bottom: '25%', right: '20%' }}
                variants={floatingElementVariants}
                initial="initial"
                animate="animate"
              >
                <Shield className="w-full h-full" />
              </motion.div>

              <motion.div
                className="absolute w-10 h-10 text-teal-600 opacity-70"
                style={{ top: '30%', right: '30%' }}
                variants={floatingElementVariants}
                initial="initial"
                animate="animate"
              >
                <Truck className="w-full h-full" />
              </motion.div>
            </div>

            {/* Main Image Container with Glow Effect */}
            <div className="relative w-full max-w-lg">
              <motion.div
                className="absolute top-0 -left-4 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute -bottom-8 right-0 w-72 h-72 bg-teal-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Glowing Line */}
              <motion.div
                variants={glowLineVariants}
                initial="hidden"
                animate="visible"
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 bg-gradient-to-b from-teal-400 via-teal-500 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
