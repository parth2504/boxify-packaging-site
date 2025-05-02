import { useEffect, useRef } from 'react';

type ModifierKey = 'altKey' | 'ctrlKey' | 'shiftKey' | 'metaKey';

interface KeyboardShortcutOptions {
  modifiers?: ModifierKey[];
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  targetElement?: HTMLElement | null;
  excludeFormElements?: boolean;
  description?: string;
}

export const useKeyboardShortcut = (
  key: string,
  callback: (event: KeyboardEvent) => void,
  options: KeyboardShortcutOptions = {}
) => {
  const {
    modifiers = [],
    enabled = true,
    preventDefault = true,
    stopPropagation = true,
    targetElement = null,
    excludeFormElements = true,
    description
  } = options;

  // Use ref to maintain the latest callback without triggering effect
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if we're typing in a form element and excludeFormElements is true
      if (excludeFormElements && isFormElement(event.target as HTMLElement)) {
        return;
      }

      // If targetElement is specified, only trigger if it matches or contains the event target
      if (targetElement && !isTargetElementMatch(event.target as HTMLElement, targetElement)) {
        return;
      }

      // Check if the pressed key matches
      if (event.key.toLowerCase() !== key.toLowerCase()) {
        return;
      }

      // Check if all required modifier keys are pressed
      const requiredModifiers = new Set(modifiers);
      const pressedModifiers = new Set(
        ['altKey', 'ctrlKey', 'shiftKey', 'metaKey'].filter(mod => event[mod as ModifierKey])
      );

      // Check if the pressed modifiers exactly match the required ones
      if (!setsAreEqual(requiredModifiers, pressedModifiers)) {
        return;
      }

      if (preventDefault) {
        event.preventDefault();
      }
      
      if (stopPropagation) {
        event.stopPropagation();
      }

      callbackRef.current(event);
    };

    // Attach the event listener
    const target = targetElement || window;
    target.addEventListener('keydown', handleKeyDown);

    return () => {
      target.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    key,
    enabled,
    preventDefault,
    stopPropagation,
    targetElement,
    excludeFormElements,
    ...modifiers
  ]);
};

// Helper function to check if element is a form element
const isFormElement = (element: HTMLElement): boolean => {
  if (!element) return false;
  
  const formTags = new Set([
    'input',
    'select',
    'textarea',
    'button'
  ]);
  
  return formTags.has(element.tagName.toLowerCase()) ||
    element.isContentEditable ||
    element.getAttribute('role') === 'textbox';
};

// Helper function to check if target element matches or is contained within specified element
const isTargetElementMatch = (target: HTMLElement, specified: HTMLElement): boolean => {
  return target === specified || specified.contains(target);
};

// Helper function to compare sets
const setsAreEqual = <T>(a: Set<T>, b: Set<T>): boolean => {
  if (a.size !== b.size) return false;
  for (const item of a) {
    if (!b.has(item)) return false;
  }
  return true;
};

export default useKeyboardShortcut;