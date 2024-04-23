'use client';

import { motion, useScroll } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

export function ScrollContainer({ children }: Props) {
  const { scrollYProgress } = useScroll();

  //   const { scrollY, scrollYProgress } = useScroll();

  //   useMotionValueEvent(scrollY, 'change', (latest) => {
  //     console.log('Page scroll: ', latest);
  //   });

  //   useMotionValueEvent(scrollYProgress, 'change', (latest) => {
  //     console.log('Page scroll progress: ', latest);
  //   });

  return (
    <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
    // <div className="fixed inset-0 left-0 top-0 z-[500] h-10 bg-black text-white">
    //   Scroll progress {scrollYProgress.get()}
    //   {children}
    // </div>
  );
}
