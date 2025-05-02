import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AriaLiveProps {
  message: string;
  assertive?: boolean;
  visual?: boolean;
}

const AriaLive = ({ message, assertive = false, visual = false }: AriaLiveProps) => {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    if (message) {
      setAnnouncements(prev => [...prev, message]);
      // Clear announcement after it's been read
      const timer = setTimeout(() => {
        setAnnouncements(prev => prev.filter(m => m !== message));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {/* Screen reader announcements */}
      <div 
        className="sr-only" 
        role="alert" 
        aria-live={assertive ? 'assertive' : 'polite'}
      >
        {announcements.map((announcement, index) => (
          <div key={`${announcement}-${index}`}>{announcement}</div>
        ))}
      </div>

      {/* Visual feedback for sighted users */}
      {visual && (
        <AnimatePresence>
          {announcements.map((announcement, index) => (
            <motion.div
              key={`${announcement}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-dark text-light px-4 py-2 rounded-lg shadow-lg text-sm border border-dark-gray/20">
                {announcement}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </>
  );
};

export default AriaLive;