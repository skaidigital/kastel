'use client'

import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({
    container: containerRef
  })
  //   const { scrollYProgress } = useScroll();
  //   const scaleX = useSpring(scrollYProgress, {
  //     stiffness: 100,
  //     damping: 30,
  //     restDelta: 0.001
  //   });

  return (
    <div ref={containerRef} className="flex h-[1600px] flex-col gap-2">
      <motion.path d="M 0 0 L 0 100" stroke="black" style={{ pathLength: scrollY }} />

      <div className="h-full w-full bg-blue-50">other content</div>
    </div>
  )
}
