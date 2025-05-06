import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Thompson',
    role: 'CEO, EcoRetail Co.',
    content: 'The quality of packaging exceeded our expectations. Our products now arrive in perfect condition, and customers love the eco-friendly materials.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder, TechBox Solutions',
    content: 'Incredible attention to detail and outstanding customer service. The custom designs helped our brand stand out in a competitive market.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Operations Manager, Fresh Foods Inc.',
    content: 'Their food-grade packaging solutions are perfect for our needs. The quick turnaround time and consistent quality keep us coming back.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

const Testimonials = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5" />
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2399F6E4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
          animate={{
            x: [-100, 100],
            y: [-100, 100],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300">
            Don't just take our word for it. Here's what businesses like yours have to say about our packaging solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="relative group"
            >
              <div className="relative p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 
                transition-all duration-300 group-hover:border-gray-700 group-hover:bg-gray-900/70 
                group-hover:shadow-lg h-full"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4">
                  <div className="p-3 rounded-full bg-teal-500/10">
                    <Quote className="w-6 h-6 text-teal-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-6 relative">
                  <p className="text-gray-300 italic">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-teal-500/20"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-100">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 -z-10 rounded-2xl bg-teal-400/5 opacity-0 
                    group-hover:opacity-100 blur-xl transition-opacity duration-300"
                  initial={false}
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 -left-20 text-teal-500/10"
          animate={{
            y: [0, 30, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Quote size={160} />
        </motion.div>

        <motion.div
          className="absolute bottom-20 -right-20 text-teal-500/10"
          animate={{
            y: [0, -30, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Quote size={160} />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
