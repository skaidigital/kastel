'use client';

import { SanityImage } from '@/components/sanity/SanityImage';
import { useProductCardContext } from '@/components/shared/ProductCard/Context';
import { SanityImageProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface Props {
  mainImage: SanityImageProps;
  lifestyleImage?: SanityImageProps;
  firstImage?: 'product' | 'lifestyle';
  priority?: boolean;
}

export function ProductCardImage({ mainImage, lifestyleImage, firstImage, priority }: Props) {
  const { isHovered, setIsHovered, activeColorway } = useProductCardContext();

  const hasLifestyleImage = !!lifestyleImage;
  const wantsLifestyleImageFirst = firstImage === 'lifestyle';

  const chosenFirstImage =
    hasLifestyleImage && wantsLifestyleImageFirst ? lifestyleImage : mainImage;
  const chosenHoverImage =
    firstImage === 'lifestyle' && lifestyleImage ? lifestyleImage : mainImage;

  const hasHoverImage = chosenHoverImage !== chosenFirstImage;

  const hasColorways = activeColorway !== undefined;

  const activeImage = hasColorways ? activeColorway?.image : chosenFirstImage;

  return (
    <div
      onMouseEnter={() => hasHoverImage && setIsHovered(true)}
      onMouseLeave={() => hasHoverImage && setIsHovered(false)}
    >
      <SanityImage
        image={isHovered && hasLifestyleImage ? chosenHoverImage : activeImage}
        className={cn('scale-100 rounded-project object-cover')}
        sizes="(min-width: 640px) 50vw, 25vw"
        fill
        priority={priority}
      />
    </div>
  );
}
