import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Custom Corrugated Boxes',
    category: 'corrugated',
    description: 'Durable shipping boxes perfect for e-commerce, designed for maximum protection.',
    image: 'https://placehold.co/600x400/1a202c/e2e8f0?text=Corrugated+Box' // Placeholder image
  },
  {
    id: 2,
    name: 'Retail Display Boxes',
    category: 'retail',
    description: 'Eye-catching boxes for retail displays that make your product pop on the shelf.',
    image: 'https://placehold.co/600x400/1a202c/e2e8f0?text=Retail+Box' // Placeholder image
  },
  {
    id: 3,
    name: 'Food Grade Packaging',
    category: 'food',
    description: 'Safe and reliable food packaging solutions that meet all industry standards.',
    image: 'https://placehold.co/600x400/1a202c/e2e8f0?text=Food+Box' // Placeholder image
  },
   {
    id: 4,
    name: 'Subscription Boxes',
    category: 'specialty',
    description: 'Customizable boxes designed for unique subscription service experiences.',
    image: 'https://placehold.co/600x400/1a202c/e2e8f0?text=Subscription+Box' // Placeholder image
  },
   {
    id: 5,
    name: 'Gift Packaging',
    category: 'specialty',
    description: 'Elegant and premium gift boxes for special occasions and branding.',
    image: 'https://placehold.co/600x400/1a202c/e2e8f0?text=Gift+Box' // Placeholder image
  },
   {
    id: 6,
    name: 'Industrial Packaging',
    category: 'industrial',
    description: 'Heavy-duty packaging solutions for industrial components and goods.',
    image: 'https://placehold.co/600x400/1a202c/e2e8f0?text=Industrial+Box' // Placeholder image
  },
];

const categories = ['all', 'corrugated', 'retail', 'food', 'specialty', 'industrial']; // Added more categories

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Ref and inView hook for section animation
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  // Filter products based on selected category
  const filteredProducts = products.filter(product =>
    selectedCategory === 'all' ? true : product.category === selectedCategory
  );

  // Variants for the section header animation
  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Variants for the category buttons animation
  const categoryButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Variants for the product card entry animation (used with AnimatePresence layout)
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3, ease: 'easeIn' } },
  };


  return (
    <section className="min-h-screen bg-gray-950 text-gray-100 py-20"> {/* Updated background and text color */}
      <div className="container mx-auto px-6"> {/* Adjusted padding */}
        {/* Section Header */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-teal-400" // Updated color and font weight
          variants={headerVariants}
          initial="hidden"
          whileInView="visible" // Animate when section is in view
          viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
        >
          Our Premium Packaging Solutions
        </motion.h1>

        {/* Category Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16" // Adjusted gap and bottom margin
          variants={headerVariants} // Use same animation as header for these
          initial="hidden"
          whileInView="visible" // Animate when section is in view
          viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md
                ${selectedCategory === category
                  ? 'bg-teal-500 text-gray-900 scale-105' // Active button style
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100' // Inactive button style
                }`}
              whileHover={{ scale: selectedCategory === category ? 1.05 : 1.03 }} // Subtle scale on hover
              whileTap={{ scale: 0.95 }} // Tap effect
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <motion.div
           ref={ref} // Attach ref to the grid container for inView animation
           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" // Adjusted grid columns for responsiveness
           initial="hidden" // Initial state for inView animation
           animate={inView ? "visible" : "hidden"} // Animate based on inView status
        >
          <AnimatePresence mode="wait"> {/* Use mode="wait" for smoother transitions during filtering */}
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout // Enables smooth layout transitions when items are added/removed
                variants={cardVariants} // Apply card animation variants
                initial="hidden"
                animate="visible" // Always animate when present in the filtered list
                exit="exit" // Animate when removed from the filtered list
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl transition-shadow duration-300" // Updated card styles
              >
                {/* Product Image */}
                <div className="relative overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" // Added ease
                  />
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> {/* Updated overlay color */}
                </div>
                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">{product.name}</h3> {/* Updated text color */}
                  <p className="text-gray-300 mb-4">{product.description}</p> {/* Updated text color and margin */}
                  {/* Learn More Button */}
                  <Link to={`/products/${product.id}`}> {/* Use Link for navigation */}
                    <motion.button
                       className="inline-flex items-center px-6 py-2 bg-teal-500 text-gray-900 rounded-full text-sm font-semibold hover:bg-teal-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md" // Styled button
                       whileHover={{ scale: 1.05 }} // Subtle scale on hover
                       whileTap={{ scale: 0.95 }} // Tap effect
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
