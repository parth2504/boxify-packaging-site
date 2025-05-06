import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkipToContent = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const main = document.querySelector('main');
    if (main) {
      main.tabIndex = -1;
      main.focus();
      main.scrollIntoView();
    }
  };

  return (
    <AnimatePresence>
      {isFocused && (
        <motion.a
          href="#main"
          onClick={handleClick}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-0 left-1/2 -translate-x-1/2 z-50
            bg-teal-500 text-gray-900 px-6 py-3 rounded-b-lg
            font-medium shadow-lg outline-none
            focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Skip to content
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default SkipToContent;