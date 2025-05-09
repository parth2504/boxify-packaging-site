import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Users,
  Leaf,
  Package,
  Award,
  Clock,
  Rocket
} from 'lucide-react';

// Company and team image URLs
const COMPANY_HERO = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000';
const MANUFACTURING = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200';
const SUSTAINABILITY = 'https://images.unsplash.com/photo-1605600659892-0ef6c4e46b9d?auto=format&fit=crop&q=80&w=1200';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Leading innovation in sustainable packaging solutions.'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    bio: 'Creating functional and beautiful packaging designs.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Sustainability Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    bio: 'Ensuring eco-friendly practices across operations.'
  },
  {
    name: 'David Kim',
    role: 'Production Manager',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    bio: 'Optimizing manufacturing processes and quality.'
  }
];

const timeline = [
  {
    year: '1995',
    title: 'Company Founded',
    description: 'Started as a small family-owned box manufacturing business.'
  },
  {
    year: '2005',
    title: 'Eco-Initiative Launch',
    description: 'Introduced our first line of eco-friendly packaging solutions.'
  },
  {
    year: '2015',
    title: 'Digital Transformation',
    description: 'Implemented state-of-the-art digital printing technology.'
  },
  {
    year: '2025',
    title: 'Global Expansion',
    description: 'Expanded operations to serve clients worldwide.'
  }
];

const values = [
  {
    icon: <Package className="w-8 h-8" />,
    title: 'Quality First',
    description: 'Committed to delivering the highest quality packaging solutions.'
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: 'Sustainability',
    description: 'Eco-friendly practices in all our operations.'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Customer Focus',
    description: 'Building lasting relationships through exceptional service.'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Innovation',
    description: 'Constantly evolving to meet modern packaging needs.'
  }
];

const About = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative py-20 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={COMPANY_HERO}
            alt="Our modern facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-950/80" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Crafting the Future of Packaging
            </h1>
            <p className="text-xl text-primary-100">
              For over 25 years, we've been innovating and delivering excellence
              in custom packaging solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <img
                src={MANUFACTURING}
                alt="Our manufacturing process"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">State-of-the-Art Manufacturing</h2>
              <p className="text-gray-600 mb-6">
                Our advanced manufacturing facility combines cutting-edge technology 
                with skilled craftsmanship to produce packaging solutions that exceed 
                industry standards.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={valuesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl font-bold mb-6">Commitment to Sustainability</h2>
              <p className="text-gray-300 mb-6">
                Environmental responsibility is at the core of everything we do. 
                From sourcing eco-friendly materials to implementing energy-efficient 
                processes, we're dedicated to reducing our environmental impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={valuesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <img
                src={SUSTAINABILITY}
                alt="Our sustainable practices"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-16"
          >
            Our Journey
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex items-center mb-12 last:mb-0"
              >
                <div className="flex-1 flex items-center">
                  {index % 2 === 0 ? (
                    <>
                      <div className="flex-1 pr-8 text-right">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                        {item.year}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                        {item.year}
                      </div>
                      <div className="flex-1 pl-8">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who drive our innovation and commitment to excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover image-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do, from product design to
              customer service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-6 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Package />, value: '10M+', label: 'Boxes Delivered' },
              { icon: <Users />, value: '1000+', label: 'Happy Clients' },
              { icon: <Clock />, value: '25+', label: 'Years Experience' },
              { icon: <Rocket />, value: '50+', label: 'Countries Served' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 text-primary-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;