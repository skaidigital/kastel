'use client'

import { formatPrice } from '@/app/api/shopify/utils'
import { Dictionary } from '@/app/dictionaries'
import { Text } from '@/components/base/Text'
import { cn } from '@/lib/utils'
import { GiftIcon } from '@heroicons/react/20/solid'
import * as Progress from '@radix-ui/react-progress'
import { useEffect, useState } from 'react'

interface Props {
  freeShippingAmount: number
  totalAmount: number
  currencyCode: string
  dictionary: Dictionary['cart_drawer']
  className?: string
}

export const FreeShippingCountdown = ({
  freeShippingAmount,
  totalAmount,
  dictionary,
  currencyCode,
  className
}: Props) => {
  const [progress, setProgress] = useState(0)

  const currentProgress = (totalAmount / freeShippingAmount) * 100
  const awayFromFreeShipping = freeShippingAmount - totalAmount
  const hasFreeShipping = totalAmount >= freeShippingAmount

  useEffect(() => {
    const correctProgress = currentProgress > 100 ? 100 : currentProgress
    const timer = setTimeout(() => setProgress(correctProgress), 500)
    return () => clearTimeout(timer)
  }, [currentProgress])

  const youAreAwayFromFreeShippingPartOne =
    dictionary.you_are_away_from_free_shipping.split('__AMOUNT__')[0]
  const youAreAwayFromFreeShippingPartTwo =
    dictionary.you_are_away_from_free_shipping.split('__AMOUNT__')[1]

  const formattedAwayFromFreeShipping = formatPrice({
    amount: String(awayFromFreeShipping),
    currencyCode
  })

  return (
    <div className={cn('flex flex-col gap-y-2', className)}>
      <div className="flex items-center gap-x-2">
        <GiftIcon className="size-6 shrink-0 rounded-full bg-nature-lab-beige p-1" />
        <>
          {hasFreeShipping && <Text size="xs">{dictionary.you_get_free_shipping}</Text>}
          {!hasFreeShipping && (
            <Text size="xs" className="text-brand-mid-grey">
              {youAreAwayFromFreeShippingPartOne} {formattedAwayFromFreeShipping}{' '}
              {youAreAwayFromFreeShippingPartTwo}
            </Text>
          )}
        </>
      </div>
      <Progress.Root
        className="relative h-2 w-full overflow-hidden rounded-[2px] bg-brand-sand"
        style={{
          // Fix overflow clipping in Safari
          // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
          transform: 'translateZ(0)'
        }}
        value={progress}
      >
        <Progress.Indicator
          className="h-full w-full bg-brand-primary transition-transform"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  )
}
