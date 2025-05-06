import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  triggerOnce?: boolean;
  skip?: boolean;
}

export const useIntersection = ({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
  triggerOnce = false,
  skip = false,
}: UseIntersectionOptions = {}) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<Element | null>(null);
  const frozen = useRef(false);

  const updateEntry = useCallback(([entry]: IntersectionObserverEntry[]) => {
    setEntry(entry);
    setIsIntersecting(entry.isIntersecting);

    if (entry.isIntersecting && triggerOnce) {
      frozen.current = true;
    }
  }, [triggerOnce]);

  useEffect(() => {
    if (skip) return;
    
    const node = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node || (freezeOnceVisible && frozen.current)) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [
    threshold,
    root,
    rootMargin,
    freezeOnceVisible,
    skip,
    updateEntry
  ]);

  const reset = useCallback(() => {
    frozen.current = false;
    setEntry(null);
    setIsIntersecting(false);
  }, []);

  return {
    ref: elementRef,
    entry,
    isIntersecting,
    reset,
    frozen: frozen.current
  };
};

// Utility type for components using the hook
export type IntersectionRef = (node: Element | null) => void;