import { useState, useEffect } from 'react';

interface AriaLiveProps {
  message: string;
  assertive?: boolean;
}

const AriaLive = ({ message, assertive = false }: AriaLiveProps) => {
  return (
    <div
      className="sr-only"
      role="status"
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      {message}
    </div>
  );
};

export default AriaLive;