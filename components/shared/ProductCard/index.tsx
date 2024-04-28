import { formatPrice } from '@/app/api/shopify/utils';
import { CustomLinkProductCard } from '@/components/CustomLink';
import { Colors } from '@/components/shared/ProductCard/Colors';
import { ProductCardProvider } from '@/components/shared/ProductCard/Context';
import { ProductCardImage } from '@/components/shared/ProductCard/Image';
import { ImageContainer } from '@/components/shared/ProductCard/ImageContainer';
import { Wishlist, WishlistFallback } from '@/components/shared/ProductCard/Wishlist';
import { ProductCardProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import { Badges } from './Badges';
import { PriceAndSizeRange } from './PriceAndSizeRange';
import { Rating, RatingFallback } from './Rating';

interface Props {
  product: ProductCardProps;
  firstImage?: 'product' | 'lifestyle';
  priority?: boolean;
  className?: string;
}

export function ProductCard({ product, firstImage, priority, className }: Props) {
  if (!product) return null;

  const {
    slug,
    gid,
    mainImage,
    lifestyleImage,
    title,
    badges,
    minVariantPrice,
    sku,
    colorways,
    sizes
  } = product;

  const hasSizeRange = sizes?.filter((size) => size.type === 'size')[0];
  const lowestSize = hasSizeRange?.options[0];
  const highestSize = hasSizeRange?.options[hasSizeRange?.options.length - 1];

  const sizeRange = `${lowestSize?.title}-${highestSize?.title}`;

  const formattedMinPrice = minVariantPrice
    ? formatPrice({
        amount: String(minVariantPrice.amount),
        currencyCode: minVariantPrice.currencyCode
      })
    : undefined;

  return (
    <div className="relative border border-brand-light-grey @container">
      <ProductCardProvider>
        <CustomLinkProductCard slug={slug}>
          <div className="absolute right-3 top-3 z-50 @xs:right-4 @xs:top-4">
            <Suspense fallback={<WishlistFallback />}>
              <Wishlist gid={gid} />
            </Suspense>
          </div>
          <div className={cn('group border-b border-brand-light-grey', className)}>
            <ImageContainer>
              {mainImage && (
                <ProductCardImage
                  priority={priority}
                  firstImage={firstImage}
                  mainImage={mainImage}
                  lifestyleImage={lifestyleImage}
                />
              )}
              <div className="absolute bottom-3 left-3 flex gap-x-1 @xs:bottom-4 @xs:left-4">
                {badges && <Badges badges={badges} />}
              </div>
              <div className="absolute bottom-3 right-3  @xs:hidden">
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
          </div>
          <div className="flex flex-col justify-center gap-y-2 border-t border-brand-light-grey bg-white p-3 @xs:flex-row @xs:justify-between @xs:p-4">
            <div className="mb-2 flex flex-col gap-y-1 truncate @xs:mb-0">
              <h3 className="truncate text-xs @xs:text-sm">{title}</h3>
              <PriceAndSizeRange price={formattedMinPrice} sizeRange={sizeRange} />
            </div>
            <div className="flex flex-col @xs:items-end">
              <div className="mb-1 hidden @xs:block">
                {sku && (
                  <Suspense fallback={<RatingFallback className="mb-1" />}>
                    <Rating sku={sku} className="mb-1" />
                  </Suspense>
                )}
              </div>
              <Colors colorways={colorways} productSlug={slug} />
            </div>
          </div>
        </CustomLinkProductCard>
      </ProductCardProvider>
    </div>
  );
}
