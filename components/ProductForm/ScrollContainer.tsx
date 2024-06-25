'use client'

import { useProductPageContext } from '@/components/pages/ProductPage/Context'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect } from 'react'

export function ProductFormScrollContainer({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll()
  const { setShowProductDescription } = useProductPageContext()
  let lastDirection: 'up' | 'down' = 'up'
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious()
    if (previous && latest !== previous) {
      const direction = latest > previous ? 'down' : 'up'

      if (direction !== lastDirection) {
        lastDirection = direction

        if (debounceTimeout) {
          clearTimeout(debounceTimeout)
        }

        debounceTimeout = setTimeout(() => {
          setShowProductDescription(direction === 'up')
        }, 100) // Adjust the debounce delay as needed
      }
    }
  })

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout)
      }
    }
  }, [])

  return <div>{children}</div>
}
