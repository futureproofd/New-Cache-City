import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // do not update the debounced value until X delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
