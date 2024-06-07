import { useEffect } from 'react';

export const useCloseOnScroll = (isOpen: boolean, setIsOpen: (isOpen: boolean) => void) => {
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isOpen, setIsOpen]);
};
