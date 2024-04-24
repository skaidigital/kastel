import { formatPrice } from '@/app/api/shopify/utils';
import { Badge } from '@/components/Badge';
import { CustomLink } from '@/components/CustomLink';
import { Colors } from '@/components/shared/ProductCard/Colors';
import { ProductCardProvider } from '@/components/shared/ProductCard/Context';
import { ProductCardImage } from '@/components/shared/ProductCard/Image';
import { ImageContainer } from '@/components/shared/ProductCard/ImageContainer';
import { Wishlist, WishlistFallback } from '@/components/shared/ProductCard/Wishlist';
import { ROUTES } from '@/data/constants';
import { ProductCardProps } from '@/lib/sanity/types';
import { Money } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import { Rating, RatingFallback } from './Rating';

interface Props extends ProductCardProps {
  firstImage?: 'product' | 'lifestyle';
  priority?: boolean;
  className?: string;
  lowestSize?: string;
  highestSize?: string;
}

// "colorWays": *[_type == "product" && references(^._id) && defined(mainImage) && defined(slug_no.current)]{
//   "image": mainImage{
//     ${fragments.getImageBase(lang)}
//   },
//   "hexCode": color->color.value,
//   "slug": slug_${lang}.current,
// },

// TODO consider having a container for the badges and rating so that we can align them
export function ProductCard({
  slug,
  gid,
  mainImage,
  lifestyleImage,
  title,
  className,
  badges,
  lowestSize,
  highestSize,
  minVariantPrice,
  maxVariantPrice,
  sku
}: Props) {
  console.log(sku);

  const isOnSale = true;
  const discountPercentage = 20;

  const sizeRange = `${lowestSize}-${highestSize}`;

  const price: Money = {
    amount: `${minVariantPrice.amount} - ${maxVariantPrice.amount}`,
    currencyCode: minVariantPrice.currencyCode
  };

  const formattedMinPrice = formatPrice({
    amount: String(minVariantPrice.amount),
    currencyCode: minVariantPrice.currencyCode
  });
  const formattedMaxPrice = formatPrice({
    amount: String(maxVariantPrice.amount),
    currencyCode: maxVariantPrice.currencyCode
  });
  const formattedPrice = formatPrice(price);

  // TODO get colorways (har logikk / alt det der i shopOurModels)
  // TODO get size range
  // TODO get priceRange to calculate price
  // TODO get sku from the product || a variant if variable product

  return (
    <div className="@container">
      <ProductCardProvider>
        <CustomLink
          className={cn('group border-b border-brand-light-grey', className)}
          href={`${ROUTES.PRODUCTS}/${slug}`}
        >
          <ImageContainer>
            <div className="absolute right-3 top-3 z-50 @xs:right-4 @xs:top-4">
              <Suspense fallback={<WishlistFallback />}>
                <Wishlist gid={gid} />
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
            {mainImage && (
              <ProductCardImage mainImage={mainImage} lifestyleImage={lifestyleImage} />
            )}
            <div className="absolute bottom-3 left-3 flex gap-x-1 @xs:bottom-4 @xs:left-4">
              {isOnSale && discountPercentage && <Badge className="">-{discountPercentage}%</Badge>}
              <Badge className="">New</Badge>
            </div>
            <div className="absolute bottom-3 right-3 border-2 @xs:hidden">
              {sku && (
                <Suspense
                  fallback={
                    <RatingFallback className="absolute bottom-3 right-3 @[320px]:bottom-4 @[320px]:right-4" />
                  }
                >
                  <Rating
                    sku={sku}
                    className="absolute bottom-3 right-3 @[320px]:bottom-4 @[320px]:right-4"
                  />
                </Suspense>
              )}
            </div>
          </ImageContainer>
          <div className="flex flex-col justify-center gap-y-2 border-y border-brand-light-grey bg-white p-3 @xs:flex-row @xs:justify-between @xs:p-4">
            <div className="mb-2 flex flex-col gap-y-1 truncate @xs:mb-0">
              <h3 className="truncate text-xs @xs:text-sm">{title}</h3>
              <div className="flex gap-x-3 text-xs text-brand-mid-grey @xs:gap-x-4 @xs:text-sm">
                <span>{formattedMinPrice}</span>
                <span>{sizeRange}</span>
              </div>
            </div>
            <div className="flex flex-col @xs:items-end">
              <div className="mb-1 hidden @xs:block">
                {sku && (
                  <Suspense fallback={<RatingFallback className="mb-1" />}>
                    <Rating sku={sku} className="mb-1" />
                  </Suspense>
                )}
              </div>
              <Colors />
            </div>
          </div>
        </CustomLink>
      </ProductCardProvider>
    </div>
  );
}
