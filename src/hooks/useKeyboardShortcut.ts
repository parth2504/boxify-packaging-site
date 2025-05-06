import { useEffect, useCallback, useRef } from 'react';

type KeyCombo = string[];
type Callback = (e: KeyboardEvent) => void;

export const useKeyboardShortcut = (keys: KeyCombo, callback: Callback) => {
  const pressedKeys = useRef<Set<string>>(new Set());
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in input fields
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement
    ) {
      return;
    }

    const key = e.key.toLowerCase();
    pressedKeys.current.add(key);

    const targetKeys = keys.map(k => k.toLowerCase());
    const allKeysPressed = targetKeys.every(k => pressedKeys.current.has(k));
    const hasExtraKeys = pressedKeys.current.size > targetKeys.length;

    if (allKeysPressed && !hasExtraKeys) {
      e.preventDefault();
      callback(e);
    }
  }, [callback, keys]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    pressedKeys.current.delete(key);
  }, []);

  const handleBlur = useCallback(() => {
    pressedKeys.current.clear();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [handleKeyDown, handleKeyUp, handleBlur]);
};