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

  const [shouldAnimateOffset, setShouldAnimateOffset] = useState<boolean>(
    hasAnnouncementBanner ? true : false
  );

  const yTransform = useTransform(scrollY, [32, 0], [32, 0]);

  useMotionValueEvent(yTransform, 'change', (latest) => {
    if (latest >= 32) {
      if (hasAnnouncementBanner) {
        setShouldAnimateOffset(false);
      }
      setShouldAnimate(true);
    }
    if (latest < 32) {
      if (hasAnnouncementBanner) {
        setShouldAnimateOffset(true);
      }
      setShouldAnimate(false);
    }
  });

  return (
    <motion.div
      style={{
        transform: shouldAnimateOffset
          ? `translateY(${32 - yTransform.get()}px)`
          : 'translateY(0px)'
      }}
      className={cn(
        'fixed left-0 top-0 z-20 w-full',
        shouldAnimate
          ? 'bg-white hover:bg-white/80 hover:backdrop-blur-lg focus:bg-white/80 focus:backdrop-blur-lg'
          : 'bg-transparent text-white hover:bg-white/80 hover:text-brand-dark-grey hover:backdrop-blur-lg focus:bg-white/80 focus:text-brand-dark-grey focus:backdrop-blur-lg'
      )}
    >
      {children}
    </motion.div>
  );
}
