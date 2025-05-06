import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

const KeyboardShortcuts = () => {
  const navigate = useNavigate();

  // Navigation shortcuts
  useKeyboardShortcut(['h'], () => navigate('/'));
  useKeyboardShortcut(['p'], () => navigate('/products'));
  useKeyboardShortcut(['a'], () => navigate('/about'));
  useKeyboardShortcut(['c'], () => navigate('/contact'));
  useKeyboardShortcut(['q'], () => navigate('/request-quote'));

  // Scroll shortcuts
  useKeyboardShortcut(['g', 't'], () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  useKeyboardShortcut(['g', 'b'], () => window.scrollTo({ 
    top: document.documentElement.scrollHeight, 
    behavior: 'smooth' 
  }));

  // Help dialog shortcut
  const [showHelp, setShowHelp] = useState(false);
  useKeyboardShortcut(['?'], () => setShowHelp(true));

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showHelp) {
        setShowHelp(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showHelp]);

  return (
    <>
      {showHelp && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm"
          onClick={() => setShowHelp(false)}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl p-8 max-w-lg w-full border border-gray-800
              shadow-2xl"
            onClick={e => e.stopPropagation()}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-100">
              Keyboard Shortcuts
            </h2>
            
            <div className="grid gap-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-teal-400 uppercase tracking-wider">
                  Navigation
                </h3>
                <div className="grid gap-3">
                  {[
                    { keys: ['H'], description: 'Go to Home' },
                    { keys: ['P'], description: 'Go to Products' },
                    { keys: ['A'], description: 'Go to About' },
                    { keys: ['C'], description: 'Go to Contact' },
                    { keys: ['Q'], description: 'Request Quote' },
                  ].map(shortcut => (
                    <div 
                      key={shortcut.description}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-300">{shortcut.description}</span>
                      <div className="flex gap-2">
                        {shortcut.keys.map(key => (
                          <kbd
                            key={key}
                            className="px-2 py-1 text-xs font-semibold text-gray-900 bg-gray-100
                              rounded border border-gray-200 shadow-sm"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-teal-400 uppercase tracking-wider">
                  General
                </h3>
                <div className="grid gap-3">
                  {[
                    { keys: ['G', 'T'], description: 'Scroll to top' },
                    { keys: ['G', 'B'], description: 'Scroll to bottom' },
                    { keys: ['?'], description: 'Show this help dialog' },
                    { keys: ['ESC'], description: 'Close dialog' },
                  ].map(shortcut => (
                    <div 
                      key={shortcut.description}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-300">{shortcut.description}</span>
                      <div className="flex gap-2">
                        {shortcut.keys.map(key => (
                          <kbd
                            key={key}
                            className="px-2 py-1 text-xs font-semibold text-gray-900 bg-gray-100
                              rounded border border-gray-200 shadow-sm"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="mt-8 w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg
                hover:bg-gray-700 transition-colors duration-200"
            >
              Close (ESC)
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default KeyboardShortcuts;