'use client';

import Video from '@/components/Video';
import { SanityImage } from '@/components/sanity/SanityImage';
import { ProductGalleryProps, SanityImageProps } from '@/lib/sanity/types';
import { useDeviceType } from '@/lib/useDeviceType';
import { cn } from '@/lib/utils';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useState } from 'react';

interface Props {
  mainImage: SanityImageProps;
  items: ProductGalleryProps;
  lifestyleImage?: SanityImageProps;
  className?: string;
}

export function MobileCarousel({ mainImage, items, lifestyleImage, className }: Props) {
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
    <div ref={ref} className={cn('keen-slider', className)}>
      {mainImage && (
        <div
          className={`keen-slider__slide number-slide-0 aspect-h-4 aspect-w-3 h-0 w-full min-w-full max-w-full transform-gpu`}
        >
          <SanityImage image={mainImage} priority fill className="absolute" sizes="100vw" />
        </div>
      )}
      {lifestyleImage && (
        <div
          className={`keen-slider__slide number-slide-1 aspect-h-4 aspect-w-3 h-0 w-full min-w-full max-w-full transform-gpu`}
        >
          <SanityImage image={lifestyleImage} priority fill className="absolute" sizes="100vw" />
        </div>
      )}
      {items.map((item, index) => {
        const correctedIndex = lifestyleImage ? index + 1 : index;

        if (item.type === 'figure') {
          return (
            <div
              key={index}
              className={`keen-slider__slide number-slide-${correctedIndex} aspect-h-4 aspect-w-3 h-0 w-full min-w-full max-w-full transform-gpu`}
            >
              <SanityImage key={index} image={item} fill className="absolute" sizes="100vw" />
            </div>
          );
        }
        if (item.type === 'mux.video') {
          return (
            <div
              key={index}
              className={`keen-slider__slide number-slide-${correctedIndex} aspect-h-4 aspect-w-3 h-0 w-full min-w-full max-w-full transform-gpu `}
            >
              <Video playbackId={item.videoUrl} resolution="HD" loading="lazy" />
            </div>
          );
        }
        return null;
      })}
      {loaded && instanceRef.current && (
        <div className="absolute bottom-0 flex w-full space-x-1">
          {Array.from(Array(instanceRef.current.track.details.slides.length).keys()).map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={cn(
                  'h-2 w-full cursor-pointer border border-none p-1',
                  currentSlide === idx ? 'bg-brand-primary' : 'bg-[#CCE5E5]'
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
