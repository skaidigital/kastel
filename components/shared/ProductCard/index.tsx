// 'use client';

import { formatPrice } from '@/app/api/shopify/utils';
import { Badge } from '@/components/Badge';
import { CustomLink } from '@/components/CustomLink';
import { SanityImage } from '@/components/sanity/SanityImage';
import { Colors } from '@/components/shared/ProductCard/Colors';
import { ImageContainer } from '@/components/shared/ProductCard/ImageContainer';
import { Rating, RatingFallback } from '@/components/shared/ProductCard/Rating';
import { Wishlist, WishlistFallback } from '@/components/shared/ProductCard/Wishlist';
import { ROUTES } from '@/data/constants';
import { ProductCardProps } from '@/lib/sanity/types';
import { Money } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

interface Props extends ProductCardProps {
  firstImage?: 'product' | 'lifestyle';
  priority?: boolean;
  className?: string;
}

// TODO consider having a container for the badges and rating so that we can align them
export function ProductCard({
  slug,
  firstImage,
  mainImage,
  lifestyleImage,
  title,
  className,
  badges,
  priority
}: Props) {
  // const [isHovered, setIsHovered] = useState<boolean>(false);

  const hasLifestyleImage = lifestyleImage ? true : false;
  const wantsLifestyleImageFirst = firstImage === 'lifestyle';
  const preferredFirstImage = firstImage;

  const chosenFirstImage =
    hasLifestyleImage && wantsLifestyleImageFirst ? lifestyleImage : mainImage;
  const chosenHoverImage =
    preferredFirstImage === 'lifestyle' && lifestyleImage ? lifestyleImage : mainImage;

  const hasHoverImage = chosenHoverImage !== chosenFirstImage;

  const isOnSale = true;
  const discountPercentage = 20;

  const sizeRange = '34-42';

  const price: Money = {
    amount: '100.00',
    currencyCode: 'USD'
  };
  const formattedPrice = formatPrice(price);

  return (
    <CustomLink
      // onMouseEnter={() => hasHoverImage && setIsHovered(true)}
      // onMouseLeave={() => hasHoverImage && setIsHovered(false)}
      className={cn('group border-b border-brand-light-grey @container', className)}
      href={`${ROUTES.PRODUCTS}/${slug}`}
    >
      <ImageContainer>
        <div className="absolute right-3 top-3 z-50 @[320px]:right-4 @[320px]:top-4">
          <Suspense fallback={<WishlistFallback />}>
            <Wishlist sku="123" />
          </Suspense>
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
            // image={isHovered && hasLifestyleImage ? chosenHoverImage : chosenFirstImage}
            image={chosenFirstImage}
            className={cn('scale-100 rounded-project object-cover')}
            sizes="(min-width: 640px) 50vw, 25vw"
            fill
            priority={priority}
          />
        )}
        <div className="absolute bottom-3 left-3 flex gap-x-1 @[320px]:bottom-4 @[320px]:left-4">
          {isOnSale && discountPercentage && <Badge className="">-{discountPercentage}%</Badge>}
          <Badge className="">New</Badge>
        </div>
        <Suspense fallback={<RatingFallback />}>
          <Rating sku="123" />
        </Suspense>
      </ImageContainer>
      <div className="flex flex-col justify-center gap-y-2 bg-white p-3 @[320px]:p-4">
        <div className="mb-2 flex flex-col gap-y-1">
          <h3 className="truncate text-xs @[320px]:text-sm">{title}</h3>
          <div className="flex gap-x-3 text-xs text-brand-mid-grey @[320px]:gap-x-4 @[320px]:text-sm">
            <span>{formattedPrice}</span>
            <span>{sizeRange}</span>
          </div>
        </div>
        <Colors />
      </div>
    </CustomLink>
  );
}
