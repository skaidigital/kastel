'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/Carousel'
import { Text } from '@/components/base/Text'
import { useActiveVariant } from '@/lib/hooks/useActiveVariant'
import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import { Product, ProductVariant } from '../hooks'

interface Props {
  productType: Product['type']
  variants: ProductVariant[]
  type: 'normal' | 'natureLab'
  items: string[]
}

export function USPCarouselLayout({ productType, variants, type, items }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const activeVariant = useActiveVariant({
    productType,
    variants
  })

  const price = activeVariant?.price
  const discountedPrice = activeVariant?.discountedPrice
  const isOnSale = discountedPrice && price && price > discountedPrice

  const lowestPrice = isOnSale ? discountedPrice : price

  const kastelPointsEarned = getKastelPoints(lowestPrice || 0, type)

  const kastelPointsEarnedString = `Earn ${kastelPointsEarned} Kastel points`
  const formattedItems = kastelPointsEarned > 0 ? [kastelPointsEarnedString, ...items] : items

  function setActive(index: number) {
    if (!api) {
      return
    }

    api.scrollTo(index)
  }

  return (
    <div className="flex items-center justify-between border border-brand-light-grey bg-brand-sand p-6">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start'
        }}
        className="grow"
        plugins={[
          Autoplay({
            delay: 3000
          })
        ]}
      >
        <CarouselContent className="-ml-2">
          {formattedItems?.map((item) => (
            <CarouselItem key={item} className="basis-[100%] pl-2">
              <div className="flex justify-between">
                <Text
                  as="p"
                  size="xs"
                  className={cn(
                    'text-brand-dark-grey',
                    type === 'natureLab' && 'font-nature-lab-body text-nature-lab-sm'
                  )}
                >
                  {item}
                </Text>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <ScrollDots
        current={current}
        count={formattedItems.length}
        onClick={setActive}
        className="pl-2"
      />
    </div>
  )
}

function ScrollDots({
  current,
  count,
  onClick,
  className
}: {
  current: number
  count: number
  onClick: (index: number) => void
  className?: string
}) {
  return (
    <div className={cn('flex justify-center gap-1', className)}>
      {Array.from({ length: count }, (_, index) => (
        <button
          onClick={() => onClick(index)}
          key={index}
          className={cn('size-2', {
            'bg-brand-primary': current === index + 1,
            'bg-brand-primary-light': current !== index + 1
          })}
        />
      ))}
    </div>
  )
}

function getKastelPoints(price: number, type?: 'normal' | 'natureLab') {
  if (type === 'natureLab') {
    return price * 12
  }

  return price * 6
}
