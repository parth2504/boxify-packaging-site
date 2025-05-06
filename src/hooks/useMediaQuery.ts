import { useState, useEffect, useCallback } from 'react';

export const useMediaQuery = (query: string) => {
  const getMatches = useCallback(() => {
    // Prevent SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  }, [query]);

  const [matches, setMatches] = useState(getMatches());

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(listener);
    }

    // Check on mount (callback is not called until a change occurs)
    setMatches(mediaQuery.matches);

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener);
      } else {
        mediaQuery.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
};

// Predefined breakpoints matching Tailwind's default breakpoints
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
  
  // Additional useful queries
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
  motion: '(prefers-reduced-motion: no-preference)',
  hover: '(hover: hover)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
} as const;

// Helper hook for breakpoint-specific queries
export const useBreakpoint = (key: keyof typeof breakpoints) => {
  return useMediaQuery(breakpoints[key]);
};