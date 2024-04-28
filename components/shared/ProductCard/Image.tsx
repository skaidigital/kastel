'use client';

import { SanityImage } from '@/components/sanity/SanityImage';
import { useProductCardContext } from '@/components/shared/ProductCard/Context';
import { OptionalSanityImageProps, SanityImageProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface Props {
  mainImage: SanityImageProps;
  lifestyleImage?: OptionalSanityImageProps;
  firstImage?: 'product' | 'lifestyle';
  priority?: boolean;
}

export function ProductCardImage({ mainImage, lifestyleImage, firstImage, priority }: Props) {
  const { isHovered, setIsHovered, activeColorway } = useProductCardContext();

  // Apply activeColorway override if available
  const effectiveMainImage = activeColorway?.image || mainImage;

  const hasLifestyleImage =
    lifestyleImage && lifestyleImage.asset && lifestyleImage.asset?._ref ? true : false;

  // Determine the first image based on the firstImage prop and available images
  const chosenFirstImage =
    firstImage === 'lifestyle' && hasLifestyleImage ? lifestyleImage : effectiveMainImage;

  // Determine the hover image. It should be the opposite unless only one image is available
  const chosenHoverImage =
    firstImage === 'lifestyle' && hasLifestyleImage
      ? effectiveMainImage
      : hasLifestyleImage
        ? lifestyleImage
        : effectiveMainImage;

  const hasHoverImage = chosenHoverImage !== chosenFirstImage;

  return (
    <div
      onMouseEnter={() => hasHoverImage && setIsHovered(true)}
      onMouseLeave={() => hasHoverImage && setIsHovered(false)}
    >
      <SanityImage
        image={isHovered ? chosenHoverImage! : chosenFirstImage}
        className={cn('scale-100 rounded-project object-cover')}
        sizes="(min-width: 640px) 50vw, 25vw"
        fill
        priority={priority}
      />
    </div>
  );
}
