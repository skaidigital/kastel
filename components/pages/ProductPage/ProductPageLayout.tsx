import { Dictionary } from '@/app/dictionaries'
import { HotspotImage } from '@/components/HotspotImage'
import { ProductForm } from '@/components/ProductForm'
import { ProductJsonLd } from '@/components/ProductForm/ProductJsonLd'
import { ProductFormScrollContainer } from '@/components/ProductForm/ScrollContainer'
import { Container } from '@/components/base/Container'
import { Heading } from '@/components/base/Heading'
import { Section } from '@/components/base/Section'
import { Text } from '@/components/base/Text'
import { ProductPageContextProvider } from '@/components/pages/ProductPage/Context'
import { MobileProductPageGallery } from '@/components/pages/ProductPage/MobileProductPageGallery'
import { ProductPageRating } from '@/components/pages/ProductPage/Rating'
import { ScrollToRatingsButton } from '@/components/pages/ProductPage/ScrollToRatingsButton'
import { ProductPageShortDescription } from '@/components/pages/ProductPage/ShortDescription'
import { USPCarousel } from '@/components/pages/ProductPage/USPCarousel'
import { ViewItemEventTrigger } from '@/components/pages/ProductPage/ViewItemEventTrigger'
import { Product } from '@/components/pages/ProductPage/hooks'
import { CrossSell } from '@/components/shared/Cart/CrossSell'
import { PageBuilder } from '@/components/shared/PageBuilder'
import { PageBuilderBlock } from '@/components/shared/PageBuilder/hooks'
import { Wishlist } from '@/components/shared/ProductCard/Wishlist'
import { ReccommendedProducts } from '@/components/shared/ReccommendedProducts'
import { LangValues, MarketValues } from '@/data/constants'
import { urlForImage } from '@/lib/sanity/image'
import { SanityImageProps } from '@/lib/sanity/types'
import { SearchParams } from '@/lib/types'
import { ColorSelector } from './ColorSelector'
import { DesktopProductGallery } from './DesktopProductGallery'
import { DiscountBadge } from './DiscountBadge'
import { PaymentIcons } from './PaymentIcons'
import { ProductDescriptionAndReviews } from './ProductDescriptionAndReviews'
import { ProductFAQs } from './ProductFAQs'
import { ProductPrice } from './ProductPrice'
import { UspsMarquee } from './Usps'

interface Props {
  data: Product
  dictionary: Dictionary['product_page']
  searchParams?: SearchParams
  market: MarketValues
  lang: LangValues
}

export async function ProductPageLayout(props: Props) {
  const { data: product, market, lang } = props

  if (!product) return null

  const {
    mainImage,
    mainCategory,
    lifestyleImage,
    title,
    id,
    type,
    descriptionShort,
    subtitle,
    variants,
    options,
    typeId,
    pageBuilder,
    largestDiscount,
    sku
  } = product

  const lifeStyleImageCheck = lifestyleImage?.asset?._ref
    ? (lifestyleImage as SanityImageProps)
    : undefined

  return (
    <ProductPageContextProvider>
      <ProductJsonLd
        productId={id}
        title={title}
        image={mainImage ? urlForImage(mainImage).url() : undefined}
      />
      {id && (
        <ViewItemEventTrigger
          productId={id}
          productTitle={title}
          price={product.minVariantPrice ? parseFloat(product.minVariantPrice.amount) : 0}
          slug={product.slug}
          imageUrl={urlForImage(mainImage).url()}
        />
      )}
      <MobileProductPageGallery
        title={title}
        lang={lang}
        mainCategory={mainCategory}
        mainImage={mainImage}
        lifestyleImage={lifeStyleImageCheck}
        galleryFemale={product.galleryFemale}
        galleryMale={product.galleryMale}
        badges={product.badges}
        isOnSale={largestDiscount ? true : false}
        discountBadge={
          <DiscountBadge
            variants={variants}
            productType={product.type}
            largestDiscount={product.largestDiscount}
          />
        }
        className="lg:hidden"
      />
      <Section
        noTopPadding
        noBottomPadding
        label="product-hero"
        srHeading="Product Hero"
        className="border-brand-border gap-y-5 border-b bg-white pb-9 lg:flex lg:pb-20"
      >
        <Container className="relative flex flex-1 flex-col gap-x-0 lg:mt-0 lg:px-0 lg:py-0 lg:pt-0 xl:flex-row">
          <DesktopProductGallery
            title={title}
            lang={lang}
            mainImage={mainImage}
            mainCategory={mainCategory}
            galleryFemale={product.galleryFemale}
            galleryMale={product.galleryMale}
            lifestyleImage={lifestyleImage as SanityImageProps}
            badges={product.badges}
            isOnSale={largestDiscount ? true : false}
            discountBadge={
              <DiscountBadge
                variants={variants}
                productType={product.type}
                largestDiscount={product.largestDiscount}
              />
            }
          />
          <div className="no-flex-grow sticky top-0 h-fit gap-y-10 lg:max-w-[560px]">
            <UspsMarquee usps={product.usps} size="sm" className="hidden lg:flex" type="normal" />
            <ProductFormScrollContainer>
              <div className="mt-6 lg:px-[84px]">
                <div className="flex flex-col">
                  <div className="mb-[10px] flex items-center justify-between">
                    <div className="flex gap-2">
                      <ScrollToRatingsButton>
                        <ProductPageRating sku={sku} />
                      </ScrollToRatingsButton>
                    </div>
                    <Wishlist gid={id} className="border border-brand-light-grey bg-[#F5F5F4]" />
                  </div>
                  {title && (
                    <Heading as="h1" size="xs" className="mb-1">
                      {title}
                    </Heading>
                  )}
                  {subtitle && (
                    <Text as="p" size="sm">
                      {subtitle}
                    </Text>
                  )}
                  {product.minVariantPrice && (
                    <ProductPrice
                      currencyCode={
                        product.minVariantPrice ? product.minVariantPrice.currencyCode : ''
                      }
                      productType={product.type}
                      variants={variants}
                      minVariantPrice={product.minVariantPrice}
                      maxVariantPrice={product.maxVariantPrice}
                      type="normal"
                    />
                  )}
                </div>
                <div className="mt-4 flex flex-col gap-8">
                  {descriptionShort && (
                    <ProductPageShortDescription
                      description={descriptionShort}
                      className="hidden lg:block"
                    />
                  )}
                  {descriptionShort && (
                    <Text as="p" size="sm" className="lg:hidden">
                      {descriptionShort}
                    </Text>
                  )}
                  {type === 'VARIABLE' && typeId && (
                    <ColorSelector typeId={typeId} market={market} lang={lang} type="normal" />
                  )}
                  <ProductForm
                    lang={lang}
                    productId={id}
                    productTitle={title}
                    type={type}
                    variants={variants}
                    options={options}
                    sizeGuide={product.sizeGuide}
                  />
                </div>
                <PaymentIcons market={market} />
                <USPCarousel
                  type="normal"
                  variants={variants}
                  productType={product.type}
                  lang={lang}
                />
                {product.faqs && <ProductFAQs faqs={product.faqs} lang={lang} type="normal" />}
                <CrossSell
                  market={market}
                  lang={lang}
                  gid={product.id}
                  className="mt-8"
                  crossSellItemClassName="p-0 lg:p-0 mt-2"
                />
              </div>
            </ProductFormScrollContainer>
          </div>
        </Container>
      </Section>
      {product.hotspotImage && product.hotspotImage.hotspots && (
        <div className="aspect-h-9 aspect-w-16 h-0 min-h-full w-full">
          <HotspotImage
            type={product.hotspotImage.type}
            image={product.hotspotImage.image}
            hotspots={product.hotspotImage.hotspots}
            sizes="100vw"
          />
        </div>
      )}
      <UspsMarquee usps={product.usps} size="lg" />
      <ProductDescriptionAndReviews
        description={product.descriptionLongDetails}
        title={product.descriptionLongTitle}
        sku={sku}
      />
      {pageBuilder &&
        pageBuilder?.length > 0 &&
        pageBuilder.map((block: PageBuilderBlock, index: number) => (
          <PageBuilder
            key={index}
            data={block}
            index={index}
            market={market}
            lang={lang}
            pageId={id}
            pageType="product"
          />
        ))}

      <ReccommendedProducts lang={lang} market={market} />
    </ProductPageContextProvider>
  )
}
