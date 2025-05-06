import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

type CategoryType = 'shipping' | 'retail' | 'food' | 'specialty' | 'industrial' | 'all';

interface ProductImages {
  [key: string]: string[];
}

interface Product {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  image: string;
  features: string[];
}

const productImages: ProductImages = {
  'shipping': [
    'https://images.unsplash.com/photo-1595079676601-f1adf5be5dee?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1530932545590-db7e4c91f900?auto=format&fit=crop&q=80&w=800'
  ],
  'retail': [
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1598343672916-de13ab0636ed?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1605040924960-34c55c8067c9?auto=format&fit=crop&q=80&w=800'
  ],
  'food': [
    'https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1609501657041-095ece2d307f?auto=format&fit=crop&q=80&w=800'
  ],
  'specialty': [
    'https://images.unsplash.com/photo-1595854443827-9d1a1ae36622?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1605040921868-20961f1a3ddd?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1612548403247-aa2873e9422d?auto=format&fit=crop&q=80&w=800'
  ],
  'industrial': [
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1587293852726-70656d4e73ab?auto=format&fit=crop&q=80&w=800'
  ]
};

const categories: CategoryType[] = ['all', 'shipping', 'retail', 'food', 'specialty', 'industrial'];

const products: Product[] = categories
  .filter((category): category is Exclude<CategoryType, 'all'> => 
    category !== 'all' && category in productImages
  )
  .map(category => ({
    id: category,
    category,
    items: Array.from({ length: Math.min(3, productImages[category].length) }, (_, i) => ({
      id: `${category}-${i + 1}`,
      category,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Box ${i + 1}`,
      description: getProductDescription(category),
      image: productImages[category][i],
      features: getProductFeatures(category)
    }))
  }))
  .flatMap(category => category.items);

function getProductDescription(category: Exclude<CategoryType, 'all'>): string {
  const descriptions: Record<Exclude<CategoryType, 'all'>, string> = {
    shipping: 'Durable shipping boxes designed for safe product delivery with custom size options.',
    retail: 'Eye-catching retail packaging that enhances product presentation and brand visibility.',
    food: 'Food-grade packaging solutions ensuring freshness and safety for your culinary products.',
    specialty: 'Unique packaging solutions tailored for special occasions and premium products.',
    industrial: 'Heavy-duty industrial packaging built to withstand demanding conditions.'
  };
  return descriptions[category] || `Premium ${category} packaging solution with custom branding options.`;
}

function getProductFeatures(category: Exclude<CategoryType, 'all'>): string[] {
  const features: Record<Exclude<CategoryType, 'all'>, string[]> = {
    shipping: ['Impact resistant', 'Weather-proof coating', 'Custom sizes'],
    retail: ['Premium finish', 'Brand customization', 'Window options'],
    food: ['Food-grade materials', 'Moisture resistant', 'Temperature safe'],
    specialty: ['Luxury finishes', 'Custom inserts', 'Gift-ready options'],
    industrial: ['Heavy-duty material', 'Stackable design', 'Forklift compatible']
  };
  return features[category] || ['Custom sizes', 'Brand printing', 'Eco-friendly materials'];
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filteredProducts = products.filter(product =>
    selectedCategory === 'all' ? true : product.category === selectedCategory
  );

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <section className="min-h-screen bg-gray-950 text-gray-100 py-20">
      <div className="container mx-auto px-6">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-teal-400"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Our Premium Packaging Solutions
        </motion.h1>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md
                ${selectedCategory === category
                  ? 'bg-teal-500 text-gray-900 scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                }`}
              whileHover={{ scale: selectedCategory === category ? 1.05 : 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
           ref={ref}
           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
           initial="hidden"
           animate={inView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">{product.name}</h3>
                  <p className="text-gray-300 mb-4">{product.description}</p>
                  <Link to={`/products/${product.id}`}>
                    <motion.button
                       className="inline-flex items-center px-6 py-2 bg-teal-500 text-gray-900 rounded-full text-sm font-semibold hover:bg-teal-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md"
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
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
