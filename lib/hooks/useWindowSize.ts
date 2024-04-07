import { useEffect, useMemo, useState } from 'react';

// Define interface for window size
interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Set the window size initially
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Memoize isDesktop and isMobile values
  const isDesktop = useMemo(() => windowSize.width && windowSize.width >= 768, [windowSize.width]);
  const isMobile = useMemo(() => windowSize.width && windowSize.width < 768, [windowSize.width]);

  return {
    windowSize,
    isDesktop,
    isMobile
  };
};
