'use client';

import LazyLoadedVideo from '@/components/LazyLoadedVideo';
import {
  ProductPageContextType,
  useProductPageContext
} from '@/components/pages/ProductPage/Context';
import { SanityImage } from '@/components/sanity/SanityImage';
import { LangValues } from '@/data/constants';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';
import { ProductGalleryProps, SanityImageProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useState } from 'react';

interface Props {
  mainImage: SanityImageProps;
  galleryFemale?: ProductGalleryProps;
  galleryMale?: ProductGalleryProps;
  lifestyleImage?: SanityImageProps;
  className?: string;
  lang?: LangValues;
}

export function MobileCarousel({
  mainImage,
  galleryFemale,
  galleryMale,
  lifestyleImage,
  className
}: Props) {
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

  const isDesktop = useIsDesktop();

  const { activeGender, setActiveGender } = useProductPageContext();

  // ? Updates the carousel when we change the gender
  useEffect(() => {
    setCurrentSlide(0);
    instanceRef.current?.update();
  }, [mainImage, lifestyleImage, galleryFemale, galleryMale, activeGender]);

  if (isDesktop) return null;

  // set gender and scroll to the first image
  function handleClick(gender: ProductPageContextType['activeGender']) {
    setActiveGender(gender);
    setCurrentSlide(0);
  }

  const activeGallery = activeGender === 'female' ? galleryFemale : galleryMale;

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
      {activeGallery &&
        activeGallery.length > 0 &&
        activeGallery.map((item, index) => {
          const slideName = `number-slide-${index + 2}`;
          if (item.type === 'figure') {
            return (
              <div
                key={index}
                className={cn(
                  'keen-slider__slide aspect-h-4 aspect-w-3 h-0 w-full min-w-full max-w-full transform-gpu',
                  slideName
                )}
              >
                <SanityImage image={item} fill className="absolute object-cover" sizes="100vw" />
              </div>
            );
          }
          if (item.type === 'mux.video') {
            return (
              <div
                key={index}
                className={cn(
                  'keen-slider__slide aspect-h-4 aspect-w-3 h-0 w-full min-w-full max-w-full transform-gpu',
                  slideName
                )}
              >
                <LazyLoadedVideo
                  playbackId={item.videoUrl}
                  resolution="HD"
                  loading="lazy"
                  className="absolute object-cover"
                />
              </div>
            );
          }
          return null;
        })}
      <div className="absolute bottom-2 right-2">
        <div className="mb-4 flex justify-center gap-x-1 text-sm">
          <button
            onClick={() => handleClick('female')}
            className={cn(
              'px-4 py-2',
              activeGender == 'female'
                ? 'bg-brand-primary text-white'
                : 'bg-brand-light-grey text-black'
            )}
          >
            Female
          </button>
          <button
            onClick={() => handleClick('male')}
            className={cn(
              'px-4 py-2',
              activeGender == 'male'
                ? 'bg-brand-primary text-white'
                : 'bg-brand-light-grey text-black'
            )}
          >
            Male
          </button>
        </div>
      </div>
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
