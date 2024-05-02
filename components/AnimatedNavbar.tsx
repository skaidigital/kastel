'use client';

import { cn } from '@/lib/utils';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

interface Props {
  hasAnnouncementBanner: boolean;
  children: React.ReactNode;
}

export function AnimatedNavbar({ hasAnnouncementBanner, children }: Props) {
  const { scrollY } = useScroll();
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);
  const [shouldShow, setShouldShow] = useState<boolean>(true);

  const [shouldAnimateOffset, setShouldAnimateOffset] = useState<boolean>(
    hasAnnouncementBanner ? true : false
  );

  const animateThresholdHeight = hasAnnouncementBanner ? 76 : 44;

  const yTransform = useTransform(scrollY, [32, 0], [32, 0]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    const diff = previous && latest - previous;

    if (latest >= animateThresholdHeight) {
      setShouldAnimate(true);
      if (previous && latest > previous && diff && diff > 50) {
        setShouldShow(false);
      }
      if (previous && latest < previous) {
        setShouldShow(true);
      }
    }
    if (latest < animateThresholdHeight) {
      setShouldAnimate(false);
    }
  });

  useMotionValueEvent(yTransform, 'change', (latest) => {
    if (latest >= 32) {
      setShouldAnimateOffset(false);
    }
    if (latest < 32) {
      setShouldAnimateOffset(true);
    }
  });

  return (
    <motion.div
      style={{
        transform: shouldAnimateOffset
          ? `translateY(${32 - yTransform.get()}px)`
          : 'translateY(0px)',
        visibility: shouldShow ? 'visible' : 'hidden'
      }}
      className={cn(
        'fixed left-0 top-0 z-20 w-full',
        shouldAnimate
          ? 'bg-white'
          : 'bg-transparent text-white hover:bg-white/80 hover:text-brand-dark-grey hover:backdrop-blur-lg focus:bg-white/80 focus:text-brand-dark-grey focus:backdrop-blur-lg'
      )}
    >
      {children}
    </motion.div>
  );
}
