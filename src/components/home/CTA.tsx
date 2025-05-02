import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation
import { ArrowRight, Box, CheckCircle } from 'lucide-react';

const benefits = [
  'Custom sizes and designs',
  'Eco-friendly materials',
  'Competitive pricing',
  'Fast turnaround times'
];

const CTA = () => {
  // Ref for the section to track scroll progress
  const containerRef = useRef<HTMLDivElement>(null);
  // Removed scrollYProgress and y/opacity transforms for a simpler, less scroll-dependent background animation

  // Variants for staggered text and list item animations
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between child animations
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 30 }, // Start lower
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Variants for the main animated box
  const boxVariants = {
    hidden: { opacity: 0, scale: 0.7, rotate: -10 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // Variants for the floating box elements
  const floatingBoxVariants = {
      animate: (i: number) => ({
        y: [-20, -60, -20], // Vertical movement
        x: [-20 + i * 20, 0 + i * 20, 20 + i * 20], // Horizontal drift
        rotate: [0, 360], // Rotation
        opacity: [0, 1, 0], // Fade in and out
        transition: {
          duration: 4, // Increased duration
          delay: i * 0.8, // Stagger delay
          repeat: Infinity,
          ease: "easeInOut" // Smoother ease
        },
      }),
  };


  return (
    <section
      ref={containerRef}
      className="relative py-24 bg-gray-950 text-gray-100 overflow-hidden" // Updated background and text colors
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
         {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/90 to-gray-950 opacity-90" />
        {/* More prominent background pattern with subtle animation */}
        <motion.div
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-[0.05]" // Updated pattern and opacity
           animate={{
             scale: [1, 1.05, 1], // Subtle zoom effect
             rotate: [0, 0.5, 0], // Subtle rotation
           }}
           transition={{
             duration: 30, // Slow animation
             repeat: Infinity,
             ease: "linear"
           }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10"> {/* Adjusted padding and z-index */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"> {/* Adjusted gap */}
          {/* Left Column - Text Content */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible" // Animate when section is in view
            viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is visible
            className="text-gray-100"
          >
            <motion.h2
              variants={textItemVariants}
              className="text-4xl md:text-5xl font-extrabold mb-6 text-teal-400" // Updated color and font weight
            >
              Ready to Transform Your Packaging?
            </motion.h2>
            <motion.p
               variants={textItemVariants}
              className="text-gray-300 text-lg mb-8" // Updated text color
            >
              Join thousands of businesses that trust us with their packaging needs.
              Get started today and receive a free consultation with our experts.
            </motion.p>

            <motion.ul
               variants={textContainerVariants} // Stagger benefits list items
               initial="hidden"
               whileInView="visible" // Animate when section is in view
               viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is visible
              className="space-y-4 mb-10" // Increased bottom margin
            >
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  variants={textItemVariants} // Animate each list item
                  className="flex items-center text-gray-200" // Updated text color
                >
                  <CheckCircle className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" /> {/* Updated color */}
                  {benefit}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
               variants={textItemVariants} // Animate the button container
              className="flex flex-wrap gap-4" // Use flex-wrap for responsiveness
            >
              {/* Primary Button */}
              <Link
                to="/request-quote"
                className="inline-flex items-center px-8 py-3 bg-teal-500 text-gray-900 rounded-full font-semibold hover:bg-teal-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50" // Matched primary button style
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
               {/* Secondary Button */}
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 bg-gray-800 text-gray-200 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50" // Matched secondary button style
              >
                View Products
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Animated Box */}
          <motion.div
            variants={boxVariants}
            initial="hidden"
            whileInView="visible" // Animate when section is in view
            viewport={{ once: true, amount: 0.5 }} // Trigger when 50% is visible
            className="relative flex items-center justify-center" // Center the box icon
          >
            {/* Main Animated Box Icon */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1], // Subtle pulse effect
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-48 h-48 md:w-64 md:h-64 text-teal-500 relative z-10" // Updated size and color
            >
              <Box className="w-full h-full" />
            </motion.div>

            {/* Floating Elements */}
            {[...Array(5)].map((_, index) => ( // Increased number of floating boxes
              <motion.div
                key={index}
                className="absolute"
                custom={index} // Pass index as custom prop
                variants={floatingBoxVariants} // Apply floating animation variants
                initial="hidden" // Use hidden initially
                animate="animate" // Start the infinite animation
              >
                <Box className="w-6 h-6 text-teal-500/60" /> {/* Updated color and size */}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
