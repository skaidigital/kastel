'use client';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/Carousel';
import { Text } from '@/components/base/Text';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import { Product, ProductVariant } from './hooks';

interface Props {
  productType: Product['type'];
  variants: ProductVariant[];
}

export function KastelPoints({ productType, variants }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const activeVariant = useActiveVariant({
    productType,
    variants
  });

  const price = activeVariant?.price;
  const discountedPrice = activeVariant?.discountedPrice;
  const isOnSale = discountedPrice && price && price > discountedPrice;

  const lowestPrice = isOnSale ? discountedPrice : price;

  const kastelPointsEarned = getKastelPoints(lowestPrice || 0);
  console.log(kastelPointsEarned);

  const data = [
    {
      text: 'Earn 1234 Kastel points'
    },
    {
      text: 'Hepp hepp'
    },
    {
      text: 'Some info about stuff'
    }
  ];

  return (
    <div className="flex items-center border border-brand-light-grey bg-brand-sand p-6">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start'
        }}
        className=""
        plugins={[
          Autoplay({
            delay: 3000
          })
        ]}
      >
        <CarouselContent className="-ml-2">
          {data?.map((content) => (
            <CarouselItem key={content.text} className="basis-[100%] pl-2">
              <div className="flex justify-between">
                <Text as="p" size="xs" className="text-brand-dark-grey">
                  {content.text}
                </Text>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <ScrollDots current={current} count={count} className="pl-2" />
    </div>
  );
}

function ScrollDots({
  current,
  count,
  className
}: {
  current: number;
  count: number;
  className?: string;
}) {
  return (
    <div className={cn('flex justify-center gap-1', className)}>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={cn('h-3 w-3', {
            'bg-brand-primary': current === index + 1,
            'bg-brand-light-grey': current !== index + 1
          })}
        />
      ))}
    </div>
  );
}

function getKastelPoints(price: number) {
  // Add rules here
  return price * 12;
}
