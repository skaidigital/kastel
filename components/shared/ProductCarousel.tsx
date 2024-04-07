'use client';

import { Heading } from '@/components/base/Heading';
import { useWindowSize } from '@/lib/hooks/useWindowSize';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { ReactNode, useState } from 'react';

interface Props {
  heading: string;
  children: ReactNode;
}

export function ProductCarousel({ heading, children }: Props) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      '(max-width: 768px': {
        slides: { perView: 2, spacing: 8 }
      },
      '(min-width: 768px)': {
        slides: { perView: 4, spacing: 8 }
      }
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    }
  });

  const { isDesktop } = useWindowSize();
  const slidesPerView = isDesktop ? 4 : 2;

  const slides = instanceRef.current?.track?.details?.slides?.length;

  const isOnFirstSlide = currentSlide === 0;
  const isOnLastSlide = currentSlide + slidesPerView === slides;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-5">
          <Heading as="h2" size="md">
            {heading}
          </Heading>
        </div>
        {loaded && instanceRef.current && (
          <div className="flex space-x-2">
            <CarouselButton
              icon={<ChevronLeftIcon className="h-4 w-4" />}
              onClick={() => instanceRef.current?.prev()}
              disabled={isOnFirstSlide}
              label="Previous slide"
            />
            <CarouselButton
              icon={<ChevronRightIcon className="h-4 w-4" />}
              onClick={() => instanceRef.current?.next()}
              disabled={isOnLastSlide}
              label="Next slide"
            />
          </div>
        )}
      </div>
      <div ref={ref} className={cn('keen-slider w-full')}>
        {children}
      </div>
    </div>
  );
}

interface CarouselButtonProps {
  icon: ReactNode;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

function CarouselButton({ icon, onClick, disabled, label }: CarouselButtonProps) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-full border border-brand-border p-2 hover:bg-brand-light-grey',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      {icon}
    </button>
  );
}
