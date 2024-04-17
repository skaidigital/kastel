'use client';

import { Badge } from '@/components/Badge';
import { CustomLink } from '@/components/CustomLink';
import { Heading } from '@/components/base/Heading';
import { SanityImage } from '@/components/sanity/SanityImage';
import { ROUTES } from '@/data/constants';
import { ProductCardProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useState } from 'react';

interface Props extends ProductCardProps {
  firstImage?: 'product' | 'lifestyle';
  priority?: boolean;
  className?: string;
  slugPrefix?: string;
}

export function ProductCard({
  slug,
  firstImage,
  mainImage,
  lifestyleImage,
  title,
  className,
  slugPrefix = 'products',
  badges,
  priority
}: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
      className={cn('group flex w-full shrink-0 flex-col', className)}
    >
      <CustomLink href={`/${ROUTES.PRODUCTS}/${slug}`} className="space-y-4">
        <AspectRatio ratio={3 / 4} className="relative w-full overflow-hidden">
          {badges && (
            <div className="absolute right-2 top-3 z-10 flex flex-col gap-1 xl:flex-row">
              {badges.map((badge) => (
                <Badge key={badge} className="mr-2" size="sm" variant="neutral">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
          {chosenFirstImage && (
            <SanityImage
              image={isHovered && hasLifestyleImage ? chosenHoverImage : chosenFirstImage}
              className={cn('scale-100 rounded-project object-cover')}
              sizes="(min-width: 640px) 50vw, 25vw"
              fill
              priority={priority}
            />
          )}
        </AspectRatio>
        <div className="flex items-center justify-center">
          <Heading as="h3" size="xs" className="text-center">
            {title}
          </Heading>
        </div>
      </CustomLink>
    </div>
  );
}
