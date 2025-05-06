import { motion } from 'framer-motion';
import { 
  Box, Shield, Truck, Recycle, 
  PaintBucket, Banknote, Users, Clock 
} from 'lucide-react';

const features = [
  {
    title: 'Custom Sizes & Designs',
    description: 'Tailor your packaging to your exact specifications with our flexible customization options.',
    icon: Box,
    color: 'text-teal-400',
    bgColor: 'bg-teal-400/10'
  },
  {
    title: 'Quality Guaranteed',
    description: 'Every box undergoes rigorous quality checks to ensure durability and reliability.',
    icon: Shield,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10'
  },
  {
    title: 'Fast Shipping',
    description: 'Quick turnaround times and reliable delivery to meet your deadlines.',
    icon: Truck,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10'
  },
  {
    title: 'Eco-Friendly Materials',
    description: 'Sustainable packaging solutions that minimize environmental impact.',
    icon: Recycle,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10'
  },
  {
    title: 'Premium Printing',
    description: 'High-quality printing options to make your brand stand out.',
    icon: PaintBucket,
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10'
  },
  {
    title: 'Competitive Pricing',
    description: 'Cost-effective solutions without compromising on quality.',
    icon: Banknote,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10'
  },
  {
    title: 'Expert Support',
    description: 'Dedicated team to assist you throughout the ordering process.',
    icon: Users,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10'
  },
  {
    title: '24/7 Order Tracking',
    description: 'Real-time updates on your order status anytime, anywhere.',
    icon: Clock,
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10'
  }
];

const Features = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  return (
    <section className="py-24 bg-gray-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            Why Choose Our Packaging Solutions?
          </h2>
          <p className="text-gray-300 text-lg">
            Discover the advantages that make us the preferred choice for businesses 
            seeking reliable and innovative packaging solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              <div className={`
                rounded-2xl p-6 h-full
                bg-gray-900/50 backdrop-blur-sm
                border border-gray-800
                transition-all duration-300
                group-hover:border-gray-700
                group-hover:bg-gray-900/70
                group-hover:shadow-lg
              `}>
                {/* Background Glow Effect */}
                <div className={`
                  absolute inset-0 -z-10 rounded-2xl opacity-0
                  group-hover:opacity-20 transition-opacity duration-300
                  ${feature.bgColor} blur-xl
                `} />

                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-xl mb-4
                  flex items-center justify-center
                  ${feature.bgColor} ${feature.color}
                `}>
                  <feature.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>

                {/* Hover Line Effect */}
                <motion.div
                  className={`
                    absolute bottom-0 left-0 right-0 h-0.5
                    origin-left ${feature.color} opacity-0
                    group-hover:opacity-100
                  `}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
