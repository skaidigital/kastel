'use client';

import Video from '@/components/Video';
import { Breadcrumbs } from '@/components/pages/ProductPage/Breadcrumbs';
import { useProductPageContext } from '@/components/pages/ProductPage/Context';
import { SanityImage } from '@/components/sanity/SanityImage';
import { LangValues } from '@/data/constants';
import { ProductGalleryProps, SanityImageProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  lang: LangValues;
  mainImage: SanityImageProps;
  mainCategory?: {
    title: string;
    slug: string;
  };
  lifestyleImage?: SanityImageProps;
  galleryFemale?: ProductGalleryProps;
  galleryMale?: ProductGalleryProps;
}

export function ProductGallery({
  title,
  lang,
  mainImage,
  mainCategory,
  lifestyleImage,
  galleryFemale,
  galleryMale
}: Props) {
  const hasLifestyleImage = lifestyleImage?.asset?._ref
    ? (lifestyleImage as SanityImageProps)
    : undefined;

  const { activeGender, setActiveGender } = useProductPageContext();

  return (
    <div className="hidden flex-grow justify-start lg:flex lg:flex-col ">
      {(galleryFemale || galleryMale) && (
        <div className="relative">
          <div className="absolute right-0 top-0 z-10 p-4">
            <div className="mb-4 flex justify-center gap-x-1">
              <button
                onClick={() => setActiveGender('female')}
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
                onClick={() => setActiveGender('male')}
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
        </div>
      )}
      {mainImage && (
        <div className="aspect-h-4 aspect-w-3 relative h-full w-full">
          <SanityImage
            priority
            image={mainImage}
            sizes="(max-width: 1024px) 100vw, 70vw"
            fill
            className="absolute h-auto w-full object-cover"
          />
          <Breadcrumbs
            productName={title}
            lang={lang}
            category={mainCategory}
            className="absolute left-4 top-4"
          />
        </div>
      )}
      {hasLifestyleImage && (
        <div className="aspect-h-4 aspect-w-3 relative h-full w-full">
          <SanityImage
            priority
            image={lifestyleImage as SanityImageProps}
            sizes="(max-width: 1024px) 100vw, 70vw"
            fill
            className="absolute h-auto w-full object-cover"
          />
        </div>
      )}
      {activeGender === 'female' &&
        galleryFemale &&
        galleryFemale.length > 0 &&
        galleryFemale.map((item, index) => {
          if (item.type === 'figure') {
            return (
              <div
                key={item.asset._ref && item.asset._ref}
                className="aspect-h-4 aspect-w-3 relative h-full w-full"
              >
                {item.asset._ref && (
                  <SanityImage
                    priority={index === 0 || index === 1}
                    key={index}
                    image={item}
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    fill
                    className="absolute h-auto w-full object-cover"
                  />
                )}
              </div>
            );
          }
          if (item.type === 'mux.video') {
            return (
              <div
                key={item.videoUrl && item.videoUrl}
                className="aspect-h-4 aspect-w-3 relative mb-10 h-full w-full"
              >
                {item.videoUrl && (
                  <Video
                    playbackId={item.videoUrl}
                    resolution="HD"
                    loading={index === 0 || index === 1 ? 'eager' : 'lazy'}
                  />
                )}
              </div>
            );
          }
          return null;
        })}
      {activeGender === 'male' &&
        galleryMale &&
        galleryMale.length > 0 &&
        galleryMale.map((item, index) => {
          if (item.type === 'figure') {
            return (
              <div
                key={item.asset._ref && item.asset._ref}
                className="aspect-h-4 aspect-w-3 relative h-full w-full"
              >
                {item.asset._ref && (
                  <SanityImage
                    priority={index === 0 || index === 1}
                    key={index}
                    image={item}
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    fill
                    className="absolute h-auto w-full object-cover"
                  />
                )}
              </div>
            );
          }
          if (item.type === 'mux.video') {
            return (
              <div
                key={item.videoUrl && item.videoUrl}
                className="aspect-h-4 aspect-w-3 relative mb-10 h-full w-full"
              >
                {item.videoUrl && (
                  <Video
                    playbackId={item.videoUrl}
                    resolution="HD"
                    loading={index === 0 || index === 1 ? 'eager' : 'lazy'}
                  />
                )}
              </div>
            );
          }
          return null;
        })}
    </div>
  );
}
