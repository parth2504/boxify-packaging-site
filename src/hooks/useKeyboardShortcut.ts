import { useEffect, useCallback, useRef } from 'react';

type KeyHandler = (e: KeyboardEvent) => void;
type KeyCombo = string | string[];
type Options = {
  exact?: boolean;
  preventDefault?: boolean;
  ignoreInputs?: boolean;
  ignoreContentEditable?: boolean;
};

export const useKeyboardShortcut = (
  keyCombo: KeyCombo,
  handler: KeyHandler,
  options: Options = {}
) => {
  const {
    exact = false,
    preventDefault = true,
    ignoreInputs = true,
    ignoreContentEditable = true,
  } = options;

  // Use refs to avoid recreating the handler on every render
  const handlerRef = useRef(handler);
  const exactRef = useRef(exact);
  const preventDefaultRef = useRef(preventDefault);
  const ignoreInputsRef = useRef(ignoreInputs);
  const ignoreContentEditableRef = useRef(ignoreContentEditable);

  // Update refs when props change
  useEffect(() => {
    handlerRef.current = handler;
    exactRef.current = exact;
    preventDefaultRef.current = preventDefault;

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