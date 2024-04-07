'use client';

import { Badge } from '@/components/Badge';
import { Heading } from '@/components/base/Heading';
import { SanityImage } from '@/components/sanity/SanityImage';
import { SanityImageProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  slug: string;
  image: SanityImageProps;
  title: string;
  className?: string;
  slugPrefix?: string;
  hoverImage?: SanityImageProps;
  badges?: string[];
  priority?: boolean;
}

export function ProductCard({
  slug,
  image,
  title,
  className,
  slugPrefix = 'products',
  hoverImage,
  badges,
  priority
}: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const hasHoverImage = hoverImage ? true : false;

  return (
    <div
      onMouseEnter={() => hasHoverImage && setIsHovered(true)}
      onMouseLeave={() => hasHoverImage && setIsHovered(false)}
      className={cn('group flex w-full shrink-0 flex-col', className)}
    >
      <Link href={`/${slugPrefix}/${slug}`} className="space-y-4">
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
          {image && (
            <SanityImage
              image={isHovered && hoverImage ? hoverImage : image}
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
      </Link>
    </div>
  );
}
