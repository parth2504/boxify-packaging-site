import { useRef, useEffect, useCallback } from 'react';

interface UseFocusOptions {
  onFocus?: () => void;
  onBlur?: () => void;
  shouldFocusOnMount?: boolean;
  shouldTrapFocus?: boolean;
}

export const useFocus = ({
  onFocus,
  onBlur,
  shouldFocusOnMount = false,
  shouldTrapFocus = false,
}: UseFocusOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const focus = useCallback(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const blur = useCallback(() => {
    if (ref.current) {
      ref.current.blur();
    }
  }, []);

  // Handle focus trapping
  useEffect(() => {
    if (!shouldTrapFocus || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [shouldTrapFocus]);

  // Handle focus on mount
  useEffect(() => {
    if (shouldFocusOnMount && ref.current) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      ref.current.focus();
    }

    return () => {
      if (shouldFocusOnMount && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [shouldFocusOnMount]);

  // Handle focus/blur callbacks
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const handleFocus = () => onFocus?.();
    const handleBlur = () => onBlur?.();

    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    return () => {
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, [onFocus, onBlur]);

  return {
    ref,
    focus,
    blur,
    isFocused: document.activeElement === ref.current,
  };
};