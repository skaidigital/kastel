'use client';

import { useCarousel } from '@/components/Carousel';
import {
  CarouselNext,
  CarouselPrevious
} from '@/components/shared/Cart/CrossSell/CrossSellCarouselButton';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function CarouselButtons({ className }: Props) {
  const { canScrollNext, canScrollPrev } = useCarousel();

  if (!canScrollNext && !canScrollPrev) return null;

  return (
    <div className={cn('hidden gap-x-1 lg:flex', className)}>
      <CarouselPrevious />
      <CarouselNext />
    </div>
  );
}
