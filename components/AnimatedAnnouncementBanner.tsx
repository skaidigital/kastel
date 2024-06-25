'use client'

import { cn } from '@/lib/utils'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'

interface Props {
  children: React.ReactNode
}

export function AnimatedAnnouncementBanner({ children }: Props) {
  const { scrollY } = useScroll()
  const [shouldShow, setShouldShow] = useState<boolean>(true)

  const animateThresholdHeight = 32

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest >= animateThresholdHeight) {
      setShouldShow(false)
    }
    if (latest < animateThresholdHeight) {
      setShouldShow(true)
    }
  })

  return (
    <motion.div
      style={{
        visibility: shouldShow ? 'visible' : 'hidden'
      }}
      className={cn(
        'fixed left-0 top-0 z-20 w-full bg-transparent text-white hover:bg-white/80 hover:text-brand-dark-grey hover:backdrop-blur-lg focus:bg-white/80 focus:text-brand-dark-grey focus:backdrop-blur-lg'
      )}
    >
      {children}
    </motion.div>
  )
}
