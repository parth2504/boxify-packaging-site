import { useState, useEffect, useCallback } from 'react';
import { errorTracker } from '../utils/errorTracking';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
    validateOnLoad?: boolean;
  } = {}
) {
  // Default serialization/deserialization
  const serialize = options.serialize ?? JSON.stringify;
  const deserialize = options.deserialize ?? JSON.parse;

  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = deserialize(item);
        
        // Optional validation of stored data
        if (options.validateOnLoad) {
          const valid = validateStoredData(parsed, initialValue);
          return valid ? parsed : initialValue;
        }
        
        return parsed;
      }
      return initialValue;
    } catch (error) {
      errorTracker.logError({
        message: 'Error reading from localStorage',
        additionalInfo: { key },
        stack: error instanceof Error ? error.stack : undefined
      });
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, serialize(storedValue));
    } catch (error) {
      errorTracker.logError({
        message: 'Error writing to localStorage',
        additionalInfo: { key, value: storedValue },
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  }, [key, storedValue, serialize]);

  // Handle storage events from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(deserialize(e.newValue));
        } catch (error) {
          errorTracker.logError({
            message: 'Error syncing localStorage across tabs',
            additionalInfo: { key, newValue: e.newValue },
            stack: error instanceof Error ? error.stack : undefined
          });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserialize]);

  // Remove item from localStorage
  const removeItem = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      errorTracker.logError({
        message: 'Error removing item from localStorage',
        additionalInfo: { key },
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  }, [key, initialValue]);

  return [
    storedValue,
    setStoredValue,
    { removeItem }
  ] as const;
}

// Utility function to validate stored data structure
function validateStoredData<T>(stored: unknown, initial: T): stored is T {
  if (typeof stored !== typeof initial) return false;

  if (Array.isArray(initial)) {
    return Array.isArray(stored);
  }

  if (initial && typeof initial === 'object') {
    return (
      stored &&
      typeof stored === 'object' &&
      Object.keys(initial).every(key => key in stored)
    );
  }

  return true;
}