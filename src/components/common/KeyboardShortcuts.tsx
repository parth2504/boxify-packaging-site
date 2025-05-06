import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { errorTracker } from '../../utils/errorTracking';

const KeyboardShortcuts = () => {
  const navigate = useNavigate();

  // Navigation shortcuts
  useKeyboardShortcut('g h', () => navigate('/'));
  useKeyboardShortcut('g p', () => navigate('/products'));
  useKeyboardShortcut('g a', () => navigate('/about'));
  useKeyboardShortcut('g c', () => navigate('/contact'));
  useKeyboardShortcut('g q', () => navigate('/request-quote'));

  // Scroll shortcuts
  useKeyboardShortcut('g t', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  useKeyboardShortcut('g b', () => window.scrollTo({ 
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  }));

  // Focus navigation
  const focusMainContent = useCallback(() => {
    const main = document.querySelector('main');
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useKeyboardShortcut('/', (e) => {
    e.preventDefault();
    const searchInput = document.querySelector<HTMLInputElement>('[role="search"] input');
    if (searchInput) {
      searchInput.focus();
    }
  });

  // Focus skip links
  useKeyboardShortcut('Tab', (e) => {
    if (e.shiftKey && document.activeElement === document.body) {
      e.preventDefault();
      const skipLink = document.querySelector<HTMLAnchorElement>('a[href="#main"]');
      if (skipLink) {
        skipLink.focus();
      }
    }
  });

  // ESC key handler for modals, menus, etc.
  useKeyboardShortcut('Escape', () => {
    // Close any open modals
    const openModal = document.querySelector<HTMLElement>('[role="dialog"][aria-modal="true"]');
    if (openModal) {
      const closeButton = openModal.querySelector<HTMLButtonElement>('button[aria-label="Close"]');
      closeButton?.click();
      return;
    }

    // Close any open menus
    const openMenu = document.querySelector<HTMLElement>('[role="menu"][aria-expanded="true"]');
    if (openMenu) {
      const menuButton = document.querySelector<HTMLButtonElement>('[aria-controls="' + openMenu.id + '"]');
      menuButton?.click();
      return;
    }

    // Remove focus from current element
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  });

  // Help modal shortcut
  useKeyboardShortcut('?', (e) => {
    e.preventDefault();
    // TODO: Implement help modal
    console.log('Show keyboard shortcuts help modal');
  });

  // Error boundary reset shortcut
  useKeyboardShortcut('Alt+R', () => {
    try {
      window.location.reload();
    } catch (error) {
      errorTracker.logError({
        message: 'Error reloading page',
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  });

  // Prevent default browser shortcuts we're overriding
  useEffect(() => {
    const preventDefaultShortcuts = (e: KeyboardEvent) => {
      if (e.key === '/' && e.target === document.body) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', preventDefaultShortcuts);
    return () => document.removeEventListener('keydown', preventDefaultShortcuts);
  }, []);

  // This component doesn't render anything
  return null;
};

export default KeyboardShortcuts;