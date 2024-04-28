'use client';

import { useCarousel } from '@/components/Carousel';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

export function CarouselNext() {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button disabled={!canScrollNext} onClick={scrollNext}>
      <ArrowRightIcon className="size-4" />
      <span className="sr-only">Next slide</span>
    </button>
  );
}

export function CarouselPrevious() {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button disabled={!canScrollPrev} onClick={scrollPrev}>
      <ArrowLeftIcon className="size-4" />
      <span className="sr-only">Previous slide</span>
    </button>
  );
}
