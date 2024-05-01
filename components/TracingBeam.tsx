import { cn } from '@/lib/utils';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

export const TracingBeam = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  // Using useTransform to calculate the end point of the line during scroll
  const yTrans = useTransform(scrollYProgress, [0, 1], [0, svgHeight]);
  const ySpring = useSpring(yTrans, {
    stiffness: 500,
    damping: 90
  });

  return (
    <motion.div ref={ref} className={cn('relative h-full w-full', className)}>
      <div className="absolute left-0 top-0 w-10">
        <motion.svg
          viewBox={`0 0 2 ${svgHeight}`}
          width="2" // Reduced line width for a fine line
          height={svgHeight}
          className="block"
          aria-hidden="true"
        >
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2={ySpring}
            stroke="var(--brand-primary)"
            strokeWidth="2"
          />
        </motion.svg>
      </div>
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </motion.div>
  );
};
