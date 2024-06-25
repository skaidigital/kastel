import { formatPrice } from '@/app/api/shopify/utils'
import { CustomLinkProductCard } from '@/components/CustomLink'
import { OnSaleBadge } from '@/components/OnSaleBadge'
import { Colors } from '@/components/shared/ProductCard/Colors'
import { ProductCardProvider } from '@/components/shared/ProductCard/Context'
import { ProductCardImage } from '@/components/shared/ProductCard/Image'
import { ImageContainer } from '@/components/shared/ProductCard/ImageContainer'
import { Rating } from '@/components/shared/ProductCard/Rating'
import { Wishlist } from '@/components/shared/ProductCard/Wishlist'
import { ProductCardProps } from '@/lib/sanity/types'
import { cn } from '@/lib/utils'
import { Badges, DiscountBadge } from './Badges'
import { PriceAndSizeRange } from './PriceAndSizeRange'

interface Props {
  product: ProductCardProps
  firstImage?: 'product' | 'lifestyle'
  priority?: boolean
  className?: string
  imageSizes?: string
}

export function ProductCard({ product, firstImage, priority, className, imageSizes }: Props) {
  if (!product) return null

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
  } = product

  const hasSizeRange = sizes?.filter((size) => size.type === 'size')[0]
  const lowestSize = hasSizeRange?.options[0]
  const highestSize = hasSizeRange?.options[hasSizeRange?.options.length - 1]
  const foundSizeRange = lowestSize && highestSize ? true : false
  const sizeRange = `${lowestSize?.title}-${highestSize?.title}`

  const biggestDiscount = product?.largestDiscount

  const formattedMinPrice = minVariantPrice
    ? formatPrice({
        amount: String(minVariantPrice.amount),
        currencyCode: minVariantPrice.currencyCode
      })
    : undefined

  return (
    <div className="relative h-full border border-brand-light-grey @container">
      <ProductCardProvider>
        <CustomLinkProductCard slug={slug}>
          <div className="absolute right-3 top-3 z-50 @xs:right-4 @xs:top-4">
            <Wishlist gid={gid} />
          </div>
          <div className={cn('group border-b border-brand-light-grey', className)}>
            <ImageContainer>
              {mainImage && (
                <ProductCardImage
                  priority={priority}
                  firstImage={firstImage}
                  mainImage={mainImage}
                  lifestyleImage={lifestyleImage}
                  sizes={imageSizes}
                />
              )}
              <div className="absolute left-3 top-3 flex gap-x-1 @xs:left-4 @xs:top-4">
                <div className="flex flex-col gap-1 @[200px]:flex-row">
                  {biggestDiscount && <OnSaleBadge className="text-xs lg:text-sm" />}
                  {biggestDiscount && (
                    <DiscountBadge discount={Number(biggestDiscount).toFixed(0)} />
                  )}
                </div>
                {badges && <Badges badges={badges} />}
              </div>
              {sku && <Rating sku={sku} className="absolute bottom-3 right-3 @xs:hidden" />}
            </ImageContainer>
          </div>
          <div className="flex flex-col justify-center gap-y-2 bg-white p-3 @xs:flex-row @xs:justify-between @xs:p-4">
            <div className="mb-2 flex flex-col gap-y-1 truncate @xs:mb-0">
              <h3 className="truncate text-xs @xs:text-sm">{title}</h3>
              <PriceAndSizeRange
                price={formattedMinPrice ? formattedMinPrice : null}
                hasSizeRange={foundSizeRange}
                sizeRange={sizeRange}
              />
            </div>
            <div className="flex flex-col @xs:items-end">
              <div className="mb-1 hidden @xs:block">
                {sku && <Rating sku={sku} className="mb-1" />}
              </div>
              <Colors colorways={colorways} productSlug={slug} />
            </div>
          </div>
        </CustomLinkProductCard>
      </ProductCardProvider>
    </div>
  )
}
