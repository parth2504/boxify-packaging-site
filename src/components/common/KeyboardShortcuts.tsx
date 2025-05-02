import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, Command } from 'lucide-react';

interface Shortcut {
  key: string;
  description: string;
  modifiers?: string[];
}

const globalShortcuts: Shortcut[] = [
  { key: '?', description: 'Show/Hide keyboard shortcuts', modifiers: ['Shift'] },
  { key: 'k', description: 'Search', modifiers: ['Ctrl'] },
  { key: 'Esc', description: 'Close dialogs' },
  { key: 'Tab', description: 'Navigate focusable elements' }
];

const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && e.shiftKey) {
        e.preventDefault();
        setIsVisible(prev => !prev);
      } else if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark/50 backdrop-blur-sm"
          onClick={() => setIsVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg p-6 bg-dark rounded-2xl shadow-xl m-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center text-light">
                <Keyboard className="w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold">Keyboard Shortcuts</h2>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-light/60 hover:text-light transition-colors"
                aria-label="Close keyboard shortcuts"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shortcuts List */}
            <div className="space-y-4">
              {globalShortcuts.map((shortcut, index) => (
                <motion.div
                  key={shortcut.description}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between text-light/80"
                >
                  <span>{shortcut.description}</span>
                  <div className="flex items-center space-x-2">
                    {shortcut.modifiers?.map(modifier => (
                      <kbd
                        key={modifier}
                        className="px-2 py-1 text-sm bg-dark-gray rounded-lg border border-primary/20"
                      >
                        {modifier === 'Ctrl' ? <Command className="w-4 h-4" /> : modifier}
                      </kbd>
                    ))}
                    <kbd className="px-2 py-1 text-sm bg-dark-gray rounded-lg border border-primary/20">
                      {shortcut.key}
                    </kbd>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-dark-gray/20 text-light/60 text-sm text-center">
              Press <kbd className="px-2 py-0.5 text-xs bg-dark-gray rounded border border-primary/20">Shift</kbd>
              {' + '}
              <kbd className="px-2 py-0.5 text-xs bg-dark-gray rounded border border-primary/20">?</kbd>
              {' to show/hide this dialog'}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;