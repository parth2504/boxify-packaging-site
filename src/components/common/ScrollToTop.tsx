import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Set focus to main content for accessibility
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.setAttribute('tabindex', '-1');
      mainContent.style.outline = 'none';
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;