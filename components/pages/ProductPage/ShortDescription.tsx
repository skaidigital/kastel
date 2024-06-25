'use client'

import { Text } from '@/components/base/Text'
import { useProductPageContext } from '@/components/pages/ProductPage/Context'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export function ProductPageShortDescription({
  description,
  className
}: {
  description: string
  className?: string
}) {
  const { showProductDescription } = useProductPageContext()

  return (
    <motion.div
      aria-hidden={!showProductDescription}
      animate={showProductDescription ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: 'hidden' }}
      className={cn(!showProductDescription && '-mt-6', className)}
    >
      <Text as="p" size="sm">
        {description}
      </Text>
    </motion.div>
  )
}
