'use client'

import { cn } from '@/lib/utils'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

export const TracingBeam = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center']
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [hasScrolledPast, setHasScrolledPast] = useState(false)
  const [svgHeight, setSvgHeight] = useState(0)

  // Use Transform & Spring for animated properties
  const yTrans = useTransform(scrollYProgress, [0, 1], [0, svgHeight])
  const ySpring = useSpring(yTrans, {
    stiffness: 100,
    damping: 20
  })

  const yEnd = useTransform(ySpring, (value) => value + 20)

  // Observing scroll progress and updating state
  useMotionValueEvent(scrollYProgress, 'change', (latestValue) => {
    if (latestValue >= 0.8 && !hasScrolledPast) {
      setHasScrolledPast(true)
    }
  })

  // Handle dynamic SVG height based on content
  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight)
    }
  }, [])

  return (
    <motion.div ref={ref} className={cn('relative w-full', className)}>
      <div className="absolute left-0 top-0 w-10">
        <motion.svg
          viewBox={`0 0 4 ${svgHeight + 24}`}
          width="16"
          height={svgHeight + 24}
          className="block"
          aria-hidden="true"
        >
          <motion.circle cx="2" cy="8" r="8" fill={hasScrolledPast ? '#407F7F' : '#CCCCCC'} />

          <line x1="2" y1="20" x2="2" y2={svgHeight + 24} stroke="#CCCCCC" strokeWidth="2" />
          <motion.line
            x1="2"
            y1="20"
            x2="2"
            y2={yEnd}
            stroke={hasScrolledPast ? '#407F7F' : '#CCCCCC'}
            strokeWidth="2"
          />
        </motion.svg>
      </div>
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </motion.div>
  )
}
