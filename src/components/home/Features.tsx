import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ChevronRight,
  Settings as CustomizeIcon,
  Leaf,
  Shield,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation

const features = [
  {
    id: 1,
    title: 'Custom Design',
    description: 'Tailor-made packaging solutions that perfectly match your brand identity.',
    image: 'https://images.unsplash.com/photo-1586528116493-d795f2095332?auto=format&fit=crop&q=80&w=800',
    icon: CustomizeIcon
  },
  {
    id: 2,
    title: 'Eco-Friendly Materials',
    description: 'Sustainable packaging options that help reduce environmental impact.',
    image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=800',
    icon: Leaf
  },
  {
    id: 3,
    title: 'Quality Assurance',
    description: 'Rigorous testing ensures your products arrive safely every time.',
    image: 'https://images.unsplash.com/photo-1598343672916-de13ab0636ed?auto=format&fit=crop&q=80&w=800',
    icon: Shield
  },
  {
    id: 4,
    title: 'Fast Turnaround',
    description: 'Quick production and delivery to meet your business needs.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    icon: Clock
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
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardItemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }} // Enhanced hover effect
              transition={{ duration: 0.3 }}
              className="relative bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700" // Updated card styles
            >
              {/* Feature Image */}
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-40 object-cover rounded-t-2xl mb-6"
              />

              {/* Feature Content */}
              <h3 className="text-xl font-semibold mb-3 text-gray-100">{feature.title}</h3> {/* Updated text color */}
              <p className="text-gray-300 mb-6">{feature.description}</p> {/* Updated text color */}

              {/* Learn More Link */}
              <Link
                to="#"
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
