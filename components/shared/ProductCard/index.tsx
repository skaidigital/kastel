import { formatPrice } from '@/app/api/shopify/utils';
import { Badge } from '@/components/Badge';
import { CustomLink } from '@/components/CustomLink';
import { Colors } from '@/components/shared/ProductCard/Colors';
import { ProductCardProvider } from '@/components/shared/ProductCard/Context';
import { ProductCardImage } from '@/components/shared/ProductCard/Image';
import { ImageContainer } from '@/components/shared/ProductCard/ImageContainer';
import { Rating, RatingFallback } from '@/components/shared/ProductCard/Rating';
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
  gid,
  mainImage,
  lifestyleImage,
  title,
  className,
  badges
}: Props) {
  const isOnSale = true;
  const discountPercentage = 20;

  const sizeRange = '34-42';

  const price: Money = {
    amount: '100.00',
    currencyCode: 'USD'
  };
  const formattedPrice = formatPrice(price);

  // TODO get colorways
  // TODO get size range
  // TODO get priceRange
  // ? for rating set a variable product use any variant's sku to get the rating
  // ? wishlist is the product gid

  return (
    <ProductCardProvider>
      <CustomLink
        className={cn('group border-b border-brand-light-grey @container', className)}
        href={`${ROUTES.PRODUCTS}/${slug}`}
      >
        <ImageContainer>
          <div className="absolute right-3 top-3 z-50 @[320px]:right-4 @[320px]:top-4">
            {/* <Suspense fallback={<WishlistFallback />}>
              <Wishlist gid={gid} />
            </Suspense> */}
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
          {mainImage && <ProductCardImage mainImage={mainImage} lifestyleImage={lifestyleImage} />}
          <div className="absolute bottom-3 left-3 flex gap-x-1 @[320px]:bottom-4 @[320px]:left-4">
            {isOnSale && discountPercentage && <Badge className="">-{discountPercentage}%</Badge>}
            <Badge className="">New</Badge>
          </div>
          <Suspense fallback={<RatingFallback />}>
            <Rating sku="123" />
          </Suspense>
        </ImageContainer>
        <div className="flex flex-col justify-center gap-y-2 border-y border-brand-light-grey bg-white p-3 @[320px]:p-4">
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
    </ProductCardProvider>
  );
}
