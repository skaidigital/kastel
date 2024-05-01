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
  const [shouldAnimateHeight, setShouldAnimateHeight] = useState<boolean>(true);

  const animateThresholdHeight = hasAnnouncementBanner ? 76 : 44;

  // Changing how the yTransform is used with transform property
  const yTransform = useTransform(scrollY, [32, 0], [32, 0]);
  console.log({ yTransform });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    console.log({ latest });
    if (latest >= animateThresholdHeight) {
      setShouldAnimate(true);
    }
    if (latest < animateThresholdHeight) {
      setShouldAnimate(false);
    }
  });

  useMotionValueEvent(yTransform, 'change', (latest) => {
    console.log('latest yTransform', latest);
    if (latest >= 32) {
      setShouldAnimateHeight(false);
    }
    if (latest < 32) {
      setShouldAnimateHeight(true);
    }
  });

  return (
    <motion.div
      //   style={{ transform: `translateY(${yTransform}px)` }}
      style={{
        transform: shouldAnimateHeight
          ? `translateY(${32 - yTransform.get()}px)`
          : 'translateY(0px)'
      }}
      className={cn(
        'fixed left-0 top-0 z-20 w-full',
        shouldAnimate ? 'bg-transparent' : 'bg-black'
      )}
    >
      {children}
    </motion.div>
  );
}
