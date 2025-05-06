import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Package, X } from 'lucide-react';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'bg-gray-950/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}
      `}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-gray-100"
          >
            <Package className="w-8 h-8 text-teal-400" />
            <span className="text-xl font-bold">Boxify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-teal-400 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/request-quote"
              className="px-6 py-2.5 bg-teal-500 text-gray-900 rounded-full font-medium 
                hover:bg-teal-600 transition-all duration-300 transform hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                focus:ring-offset-gray-900"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-teal-400
              focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800"
            >
              <div className="py-4 px-6 space-y-3">
                {navigation.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-gray-300 hover:text-teal-400 
                        transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  <Link
                    to="/request-quote"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-2.5 mt-4 bg-teal-500 text-gray-900 
                      rounded-full font-medium text-center hover:bg-teal-600 
                      transition-colors duration-200"
                  >
                    Request Quote
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;