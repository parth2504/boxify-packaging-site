import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation

const Footer = () => {
  // Ref and inView hook for section animation
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the element is visible
    triggerOnce: true // Only trigger the animation once
  });

  // Variants for staggered column animation
  const columnVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Variants for the "Made with Heart" animation
  const heartVariants = {
    animate: {
      scale: [1, 1.2, 1], // Pulse effect
    },
    transition: {
      duration: 1.5, // Slightly slower pulse
      repeat: Infinity,
      ease: "easeInOut"
    },
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your newsletter submission logic here
    console.log('Newsletter form submitted');
    // You might want to add state to manage input value and submission status
  };

  return (
    <footer className="bg-gray-950 text-gray-100"> {/* Updated background and text color */}
      <div className="container mx-auto px-6 py-20"> {/* Adjusted padding */}
        <div
          ref={ref} // Attach ref to the main grid container
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8" // Adjusted gap
        >
          {/* Company Info */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"} // Animate based on inView status
          >
            <Link to="/" className="inline-block mb-6">
              {/* Replace with your actual logo or a placeholder */}
              <img src="https://placehold.co/120x32/1a202c/e2e8f0?text=Boxify" alt="Boxify Logo" className="h-8" />
            </Link>
            <p className="text-gray-300 mb-6"> {/* Updated text color */}
              Crafting exceptional packaging solutions for businesses worldwide. Your success,
              beautifully boxed.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook className="w-5 h-5" />, href: '#' },
                { icon: <Twitter className="w-5 h-5" />, href: '#' },
                { icon: <Instagram className="w-5 h-5" />, href: '#' },
                { icon: <Linkedin className="w-5 h-5" />, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 text-gray-300 flex items-center justify-center hover:bg-teal-500 hover:text-gray-900 transition-colors duration-300 shadow-md" // Styled social icons
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }} // Added delay
          >
            <h3 className="text-lg font-semibold mb-6 text-gray-100">Quick Links</h3> {/* Updated text color */}
            <ul className="space-y-4">
              {[
                { text: 'Products', href: '/products' },
                { text: 'About Us', href: '/about' },
                { text: 'Contact', href: '/contact' },
                { text: 'Request Quote', href: '/request-quote' }
              ].map((link) => (
                <li key={link.text}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-300" // Updated link colors
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }} // Added delay
          >
            <h3 className="text-lg font-semibold mb-6 text-gray-100">Contact Us</h3> {/* Updated text color */}
            <ul className="space-y-4 text-gray-300"> {/* Updated text color */}
              <li>123 Packaging Street</li>
              <li>Box City, BC 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@boxify.com</li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }} // Added delay
          >
            <h3 className="text-lg font-semibold mb-6 text-gray-100">Newsletter</h3> {/* Updated text color */}
            <p className="text-gray-300 mb-4"> {/* Updated text color */}
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-3 pr-12 rounded-full bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-300" // Styled input
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-gray-900 shadow-md" // Styled button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Subscribe" // Accessibility
                >
                  <Send className="w-5 h-5" /> {/* Increased icon size */}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }} // Added delay
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-700" // Updated border color
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0"> {/* Updated text color */}
              © {new Date().getFullYear()} Boxify. All rights reserved.
            </p>
            <div className="flex items-center text-gray-500 text-sm"> {/* Updated text color */}
              <span>Made with </span>
              <motion.div
                variants={heartVariants} // Apply heart animation variants
                initial="animate" // Start the animation immediately (it's infinite)
                className="mx-1 text-red-500" // Changed heart color to red for contrast
              >
                <Heart className="w-4 h-4 inline" />
              </motion.div>
              <span>by Boxify Team</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
