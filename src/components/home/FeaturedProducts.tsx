import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

// Dummy Image component - replace with your actual Image component if needed
// This is just to make the code runnable without an external dependency
const Image = ({ src, alt, className }: ImageProps) => {
  // Use a placeholder image if the src is a local path that won't work in a standalone preview
  const imageUrl = src.startsWith('/src/') ? 'https://placehold.co/600x400/1a202c/e2e8f0?text=Product+Image' : src;
  return <img src={imageUrl} alt={alt} className={className} />;
};

const products = [
  {
    id: 1,
    name: 'Custom Shipping Boxes',
    category: 'Shipping & Logistics',
    price: 'From $2.99/unit',
    description: 'Durable corrugated boxes designed for safe product delivery, with custom printing options and eco-friendly materials.',
    image: 'https://images.unsplash.com/photo-1595079676601-f1adf5be5dee?auto=format&fit=crop&q=80&w=800',
    features: [
      'Custom sizes & dimensions',
      'Full-color brand printing',
      'Eco-friendly materials',
      'Bulk order discounts',
      'Weather-resistant options'
    ]
  },
  {
    id: 2,
    name: 'Premium Retail Packaging',
    category: 'Retail & Display',
    price: 'From $3.99/unit',
    description: 'Eye-catching retail boxes that enhance product presentation, featuring premium finishes and customizable designs.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    features: [
      'Premium finish options',
      'Window cut-outs available',
      'Embossing & foil stamping',
      'Magnetic closure options',
      'Recyclable materials'
    ]
  },
  {
    id: 3,
    name: 'Food-Grade Packaging',
    category: 'Food & Beverage',
    price: 'From $1.99/unit',
    description: 'Food-grade packaging solutions ensuring maximum freshness and safety, perfect for restaurants and food services.',
    image: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&q=80&w=800',
    features: [
      'FDA approved materials',
      'Moisture & grease resistant',
      'Temperature safe (-20°C to 150°C)',
      'Tamper-evident options',
      'Microwave-safe variants'
    ]
  }
];

const FeaturedProducts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Updated slide variants to maintain vertical position
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    })
  };

  // Variants for staggered animation of product details
  const detailsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between children animations
      },
    },
  };

  const detailItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prevIndex) => (
      (prevIndex + newDirection + products.length) % products.length
    ));
  };

  return (
    <section className="py-20 bg-gray-950 text-gray-100">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
          className="text-center max-w-4xl mx-auto mb-16" // Increased max-width
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-teal-400">
            Featured Products
          </h2>
          <p className="text-gray-300 text-lg">
            Explore our most popular packaging solutions crafted with precision and care.
          </p>
        </motion.div>

        {/* Product Showcase - Added fixed height container */}
        <div className="relative overflow-hidden">
          <div className="h-[800px]"> {/* Fixed height container */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center absolute inset-0"
              >
                {/* Product Image */}
                <motion.div
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700 h-[450px]"
                >
                  <Image
                    src={products[activeIndex].image}
                    alt={products[activeIndex].name}
                    className="w-full h-[450px] object-cover"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent" />
                  {/* Product Price and Category Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-gray-100">
                    <p className="text-sm uppercase tracking-wider font-semibold mb-2 text-teal-400">
                      {products[activeIndex].category}
                    </p>
                    <p className="text-3xl font-bold">
                      {products[activeIndex].price}
                    </p>
                  </div>
                </motion.div>

                {/* Product Details - Added max-height and overflow handling */}
                <motion.div
                  variants={detailsContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6 h-[450px] overflow-y-auto custom-scrollbar"
                >
                  <motion.h3
                    variants={detailItemVariants}
                    className="text-3xl md:text-4xl font-bold text-gray-100"
                  >
                    {products[activeIndex].name}
                  </motion.h3>

                  <motion.p
                    variants={detailItemVariants}
                    className="text-gray-300 text-lg"
                  >
                    {products[activeIndex].description}
                  </motion.p>

                  <motion.ul
                    variants={detailsContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {products[activeIndex].features.map((feature, index) => (
                      <motion.li
                        key={index}
                        variants={detailItemVariants}
                        className="flex items-center text-gray-200"
                      >
                        <motion.div
                          className="w-2.5 h-2.5 rounded-full bg-teal-500 mr-3 flex-shrink-0"
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.div
                    variants={detailItemVariants}
                    className="flex flex-wrap gap-4"
                  >
                    {/* Learn More Button */}
                    <Link
                      to={`/products/${products[activeIndex].id}`}
                      className="inline-flex items-center px-8 py-3 bg-teal-500 text-gray-900 rounded-full font-semibold hover:bg-teal-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                    >
                      Learn More
                    </Link>
                    {/* Request Quote Button */}
                    <Link
                      to="/request-quote"
                      className="inline-flex items-center px-8 py-3 bg-gray-800 text-gray-200 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
                    >
                      Request Quote
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 px-4 md:px-6 flex justify-between pointer-events-none z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full bg-gray-700 shadow-lg flex items-center justify-center text-teal-400 pointer-events-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full bg-gray-700 shadow-lg flex items-center justify-center text-teal-400 pointer-events-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center mt-12 gap-3 z-10">
            {products.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? 'bg-teal-500' : 'bg-gray-700 hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
