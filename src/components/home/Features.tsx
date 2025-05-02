import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Package,
  Recycle,
  Truck,
  Shield,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation

const features = [
  {
    icon: <Package className="w-8 h-8" />,
    title: 'Custom Packaging',
    description: 'Tailored solutions designed to perfectly fit your product and brand identity.',
    link: '/products#custom'
  },
  {
    icon: <Recycle className="w-8 h-8" />,
    title: 'Eco-Friendly Materials',
    description: 'Sustainable packaging options that help reduce environmental impact.',
    link: '/products#eco'
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Fast Delivery',
    description: 'Quick turnaround times and reliable shipping to meet your deadlines.',
    link: '/products#shipping'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Quality Assurance',
    description: 'Rigorous testing and premium materials for superior protection.',
    link: '/products#quality'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: '24/7 Support',
    description: 'Round-the-clock customer service to assist you anytime.',
    link: '/contact'
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: 'Premium Design',
    description: 'Eye-catching designs that enhance your brand presentation.',
    link: '/products#design'
  }
];

const Features = () => {
  const [ref, inView] = useInView({
    threshold: 0.1, // Trigger when 10% of the element is visible
    triggerOnce: true // Only trigger the animation once
  });

  // Animation variants for staggered appearance of feature cards
  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start lower
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Animation variants for the heading and subheading
   const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };


  return (
    <section className="py-20 bg-gray-950 text-gray-100"> {/* Updated background and text color */}
      <div className="container mx-auto px-6"> {/* Adjusted padding */}
        <motion.div
           variants={textVariants}
           initial="hidden"
           animate="visible"
           className="text-center max-w-4xl mx-auto mb-16" // Increased max-width
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-teal-400"> {/* Updated color and font weight */}
            Why Choose Boxify?
          </h2>
          <p className="text-gray-300 text-lg"> {/* Updated text color */}
            Discover the innovative features that make our packaging solutions stand out.
            We combine quality, sustainability, and design to deliver excellence.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={cardContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"} // Animate based on inView status
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardItemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }} // Enhanced hover effect
              transition={{ duration: 0.3 }}
              className="relative bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700" // Updated card styles
            >
              {/* Feature Icon */}
              <motion.div
                className="w-14 h-14 rounded-full bg-teal-500/15 text-teal-400 flex items-center justify-center mb-6" // Updated icon container style
              >
                {feature.icon}
              </motion.div>

              {/* Feature Content */}
              <h3 className="text-xl font-semibold mb-3 text-gray-100">{feature.title}</h3> {/* Updated text color */}
              <p className="text-gray-300 mb-6">{feature.description}</p> {/* Updated text color */}

              {/* Learn More Link */}
              <Link
                to={feature.link}
                className="inline-flex items-center text-teal-400 font-medium hover:text-teal-500 transition-colors duration-200" // Updated link color
              >
                Learn More
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }} // Simple back and forth animation
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop" // Changed repeatType for continuous loop
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.span>
              </Link>

            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={textVariants} // Use the same text animation for the CTA
          initial="hidden"
          animate={inView ? "visible" : "hidden"} // Animate based on inView status
          transition={{ duration: 0.6, delay: 0.4 }} // Added a slight delay
          className="text-center mt-20" // Increased top margin
        >
          <Link
            to="/request-quote"
            className="inline-flex items-center px-10 py-4 bg-teal-500 text-gray-900 rounded-full font-semibold hover:bg-teal-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50" // Matched primary button style from Hero
          >
            Get Started with Custom Packaging
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
