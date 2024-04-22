'use client';

import { Badge } from '@/components/Badge';
import { CustomLink } from '@/components/CustomLink';
import { SanityImage } from '@/components/sanity/SanityImage';
import { ROUTES } from '@/data/constants';
import { ProductCardProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { HeartIcon } from '@radix-ui/react-icons';
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
    <article
      onMouseEnter={() => hasHoverImage && setIsHovered(true)}
      onMouseLeave={() => hasHoverImage && setIsHovered(false)}
      className={cn('group flex w-full shrink-0 flex-col @container', className)}
    >
      <CustomLink href={`${ROUTES.PRODUCTS}/${slug}`}>
        <AspectRatio ratio={3 / 4} className="relative w-full overflow-hidden">
          <div className="absolute right-3 top-3 z-50 @[320px]:right-4 @[320px]:top-4">
            <div className="z-50 flex items-center justify-center rounded-full bg-white p-2">
              <HeartIcon className="size-4 fill-black text-black" />
            </div>
          </div>
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
          <Badge className="absolute bottom-3 left-3 @[320px]:bottom-4 @[320px]:left-4">New</Badge>
          <div className="@[320px]:botttom-4 absolute bottom-3 right-3 text-xs @[320px]:right-4 @[320px]:text-sm">
            ✨4.9 (2466)
          </div>
        </AspectRatio>
        <div className="flex flex-col justify-center gap-y-2 bg-white p-3 @[320px]:p-4">
          <div className="flex flex-col gap-y-1">
            <h3 className="text-xs @[320px]:text-sm">{title}</h3>
            <span className="text-xs text-brand-mid-grey @[320px]:text-sm">size og price</span>
          </div>
          <Colors />
        </div>
      </CustomLink>
    </article>
  );
}

function Colors() {
  return (
    <div className="flex gap-x-1">
      <ColorItem />
      <ColorItem />
      <ColorItem />
      <ColorItem />
    </div>
  );
}

function ColorItem() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return (
    <div
      style={{ backgroundColor: `#${randomColor}` }}
      className="size-6 rounded-[2px] border border-brand-light-grey "
    />
  );
}
