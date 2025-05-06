import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, Facebook, Twitter, Instagram, Linkedin,
  Mail, Phone, MapPin
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Products',
      links: [
        { name: 'Custom Boxes', href: '/products/custom-boxes' },
        { name: 'Retail Packaging', href: '/products/retail' },
        { name: 'Food Packaging', href: '/products/food' },
        { name: 'Eco-Friendly', href: '/products/eco-friendly' },
        { name: 'Shipping Supplies', href: '/products/shipping' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Process', href: '/process' },
        { name: 'Sustainability', href: '/sustainability' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press Kit', href: '/press' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Shipping Policy', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'Track Order', href: '/track' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];

  const contactInfo = [
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: Mail, text: 'contact@boxify.com', href: 'mailto:contact@boxify.com' },
    { icon: MapPin, text: '123 Packaging St, Box City, PC 12345', href: '#' }
  ];

  return (
    <footer className="bg-gray-950 pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
          animate={{
            x: [-20, 20],
            y: [-20, 20],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Package className="w-8 h-8 text-teal-400" />
              <span className="text-2xl font-bold text-gray-100">Boxify</span>
            </Link>
            <p className="text-gray-400 mb-8 max-w-md">
              We create innovative packaging solutions that protect your products 
              and enhance your brand. Sustainable, customizable, and built to impress.
            </p>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.text}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-400 hover:text-teal-400 transition-colors duration-200"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-gray-100 font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Boxify. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-900 text-gray-400 
                    hover:bg-teal-500/10 hover:text-teal-400
                    flex items-center justify-center
                    transition-all duration-200"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
