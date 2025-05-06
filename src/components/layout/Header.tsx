import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Package, X } from 'lucide-react';

// Video background URL
const HERO_VIDEO = 'https://static.videezy.com/system/resources/previews/000/021/644/original/boxes-background-loop.mp4';
const HEADER_BG = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000';

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
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Video Background with Fallback Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/90 to-transparent" />
      </div>

      <nav
        className={`relative container mx-auto px-4 z-10 transition-all duration-300 ${
          isScrolled ? 'bg-light shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Package className={`w-8 h-8 ${isScrolled ? 'text-dark' : 'text-light'}`} />
            <span className={`ml-2 text-2xl font-bold ${isScrolled ? 'text-dark' : 'text-light'}`}>
              Boxify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isScrolled ? 'text-dark-gray hover:text-primary' : 'text-light hover:text-primary-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/request-quote"
              className="px-6 py-2 bg-primary text-light rounded-full text-sm font-medium hover:bg-primary-600 transition-colors duration-300"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-dark-gray hover:bg-light/10 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-light"
            >
              <div className="py-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 text-dark-gray hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/request-quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block mx-4 px-4 py-2 text-center bg-primary text-light rounded-lg hover:bg-primary-600 transition-colors duration-300"
                >
                  Request Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;