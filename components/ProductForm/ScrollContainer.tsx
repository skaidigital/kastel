'use client';

import { useProductPageContext } from '@/components/pages/ProductPage/Context';
import { useMotionValueEvent, useScroll } from 'framer-motion';

export function ProductFormScrollContainer({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const { setShowProductDescription } = useProductPageContext();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();

    // If we're scrolling down, hide the description
    if (previous && latest > previous) {
      setShowProductDescription(false);
    }
    // If we're scrolling up, show the description
    if (previous && latest < previous) {
      setShowProductDescription(true);
    }
  });

  return <div>{children}</div>;
}
