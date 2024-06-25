'use client'

import { Text } from '@/components/base/Text'
import { useCollectionContext } from '@/components/pages/CollectionPage/Context'

interface Props {
  productsString: string
}

export function ProductCount({ productsString }: Props) {
  const { numberOfProducts } = useCollectionContext()
  return (
    <Text size="xs" className="text-brand-mid-grey">
      {numberOfProducts} {productsString}
    </Text>
  )
}
