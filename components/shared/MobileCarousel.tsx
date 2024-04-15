'use client';

import { SanityImage } from '@/components/sanity/SanityImage';
import { GalleryProps } from '@/lib/sanity/types';
import { useDeviceType } from '@/lib/useDeviceType';
import { cn } from '@/lib/utils';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useState } from 'react';

interface Props {
  images: GalleryProps;
  className?: string;
}

export function MobileCarousel({ images, className }: Props) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1
    },
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    }
  });

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  const { isDesktop } = useDeviceType();

  if (isDesktop) return null;

  return (
    <div ref={ref} className={cn('keen-slider relative w-full', className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`keen-slider__slide number-slide-${index} aspect-h-4 aspect-w-3 w-full min-w-full max-w-full transform-gpu `}
        >
          <SanityImage
            priority={index === 0}
            key={index}
            image={image}
            className="absolute h-auto w-full object-cover"
            sizes="100vw"
          />
        </div>
      ))}
      {loaded && instanceRef.current && (
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 justify-center  space-x-1.5">
          {Array.from(Array(instanceRef.current.track.details.slides.length).keys()).map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={cn(
                  'w-8 cursor-pointer border border-none border-brand-mid-grey p-1',
                  currentSlide === idx ? 'bg-brand-dark-grey' : 'bg-brand-light-grey'
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
