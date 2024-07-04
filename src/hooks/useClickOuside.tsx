import { useEffect } from 'react';

const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void,
) => {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      callback();
    };

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler, true);
    };
  }, [ref, callback]);
};

export default useClickOutside;
