'use client';

import { SanityImage } from '@/components/sanity/SanityImage';
import { useProductCardContext } from '@/components/shared/ProductCard/Context';
import { SanityImageProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface Props {
  mainImage: SanityImageProps;
  lifestyleImage?: SanityImageProps;
  firstImage?: 'product' | 'lifestyle';
}

export function ProductCardImage({ mainImage, lifestyleImage, firstImage }: Props) {
  const { isHovered, setIsHovered } = useProductCardContext();

  const hasLifestyleImage = lifestyleImage ? true : false;
  const wantsLifestyleImageFirst = firstImage === 'lifestyle';
  const preferredFirstImage = firstImage;

  const chosenFirstImage =
    hasLifestyleImage && wantsLifestyleImageFirst ? lifestyleImage : mainImage;
  const chosenHoverImage =
    preferredFirstImage === 'lifestyle' && lifestyleImage ? lifestyleImage : mainImage;

  const hasHoverImage = chosenHoverImage !== chosenFirstImage;

  return (
    <div
      onMouseEnter={() => hasHoverImage && setIsHovered(true)}
      onMouseLeave={() => hasHoverImage && setIsHovered(false)}
    >
      <SanityImage
        // TODO fix type error
        image={isHovered && hasLifestyleImage ? chosenHoverImage : chosenFirstImage}
        className={cn('scale-100 rounded-project object-cover')}
        sizes="(min-width: 640px) 50vw, 25vw"
        fill
      />
    </div>
  );
}
