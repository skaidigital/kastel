'use client';

import { Carousel, CarouselApi, CarouselContent } from '@/components/Carousel';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  count: number;
}

export function TestimonialCarousel({ children, count }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function setActive(index: number) {
    if (!api) {
      return;
    }

    api.scrollTo(index);
  }

  return (
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
      <CarouselContent className="-ml-0 mb-4 lg:mb-6">{children}</CarouselContent>
      <ScrollDots
        current={current}
        count={count}
        onClick={setActive}
        className="flex justify-start"
      />
    </Carousel>
  );
}

function ScrollDots({
  current,
  count,
  onClick,
  className
}: {
  current: number;
  count: number;
  onClick: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex justify-center gap-1.5', className)}>
      {Array.from({ length: count }, (_, index) => (
        <button
          aria-label={`${index + 1}`}
          onClick={() => onClick(index)}
          key={index}
          className={cn('size-3', {
            'bg-brand-primary': current === index + 1,
            'bg-brand-primary-light': current !== index + 1
          })}
        />
      ))}
    </div>
  );
}
