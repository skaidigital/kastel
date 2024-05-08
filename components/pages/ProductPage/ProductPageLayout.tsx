import { Dictionary } from '@/app/dictionaries';
import { HotspotImage } from '@/components/HotspotImage';
import { ProductForm } from '@/components/ProductForm';
import { ProductFormSkeleton } from '@/components/ProductForm/ProductFormSkeleton';
import { ProductJsonLd } from '@/components/ProductForm/ProductJsonLd';
import Video from '@/components/Video';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { Breadcrumbs } from '@/components/pages/ProductPage/Breadcrumbs';
import { ScrollToRatingsButton } from '@/components/pages/ProductPage/ScrollToRatingsButton';
import { USPCarousel } from '@/components/pages/ProductPage/USPCarousel';
import { Product } from '@/components/pages/ProductPage/hooks';
import { SanityImage } from '@/components/sanity/SanityImage';
import { CrossSell } from '@/components/shared/Cart/CrossSell';
import { CrossSellSkeleton } from '@/components/shared/Cart/CrossSell/CrossSellSkeleton';
import { MobileCarousel } from '@/components/shared/MobileCarousel';
import { PageBuilder } from '@/components/shared/PageBuilder';
import { PageBuilderBlock } from '@/components/shared/PageBuilder/hooks';
import { Rating } from '@/components/shared/ProductCard/Rating';
import { Wishlist, WishlistFallback } from '@/components/shared/ProductCard/Wishlist';
import { ReccommendedProducts } from '@/components/shared/ReccommendedProducts';
import { LangValues, MarketValues } from '@/data/constants';
import { urlForImage } from '@/lib/sanity/image';
import { SanityImageProps } from '@/lib/sanity/types';
import { SearchParams } from '@/lib/types';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { ColorSelectLayout } from './ColorSelectLayout';
import { DiscountBadge } from './DiscountBadge';
import { GenderImageButton } from './GenderImageButton';
import { PaymentIcons } from './PaymentIcons';
import { ProductDescriptionAndReviews } from './ProductDescriptionAndReviews';
import { ProductFAQs } from './ProductFAQs';
import { ProductPrice } from './ProductPrice';
import { UspsMarquee } from './Usps';

interface Props {
  data: Product;
  dictionary: Dictionary['product_page'];
  searchParams?: SearchParams;
  market: MarketValues;
  lang: LangValues;
}

export async function ProductPageLayout(props: Props) {
  const { data: product, market, lang } = props;

  if (!product) return null;

  const activeGender = cookies().get('gender')?.value as 'male' | 'female' | undefined;

  const {
    gallery,
    mainImage,
    lifestyleImage,
    title,
    id,
    type,
    descriptionShort,
    subtitle,
    variants,
    options,
    typeId,
    pageBuilder
  } = product;

  const productSku = 'SOL002-002-021-40';

  const lifeStyleImageCheck = lifestyleImage?.asset?._ref
    ? (lifestyleImage as SanityImageProps)
    : undefined;

  return (
    <>
      <ProductJsonLd
        productId={id}
        title={title}
        image={mainImage ? urlForImage(mainImage).url() : undefined}
      />
      {gallery && gallery.length > 0 && (
        <div className="relative w-full">
          <MobileCarousel
            mainImage={mainImage}
            lifestyleImage={lifeStyleImageCheck}
            items={gallery}
            lang={lang}
          />
          <Breadcrumbs productName={title} lang={lang} className="absolute left-3 top-3" />
        </div>
      )}
      <Section
        noTopPadding
        noBottomPadding
        label="product-hero"
        srHeading="Product Hero"
        className="border-brand-border gap-y-5 border-b bg-white pb-9 lg:flex lg:pb-20"
      >
        <Container className="relative flex flex-1 flex-col gap-x-0 lg:mt-0 lg:px-0 lg:py-0 lg:pt-0 xl:flex-row">
          <div className="hidden flex-grow justify-start lg:flex lg:flex-col ">
            <GenderImageButton activeGender={activeGender} />
            {mainImage && (
              <div className="aspect-h-4 aspect-w-3 relative h-full w-full">
                <SanityImage
                  priority
                  image={mainImage}
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  fill
                  className="absolute h-auto w-full object-cover"
                />
                <Breadcrumbs productName={title} lang={lang} className="absolute left-4 top-4" />
              </div>
            )}
            {lifeStyleImageCheck && (
              <div className="aspect-h-4 aspect-w-3 relative h-full w-full">
                <SanityImage
                  priority
                  image={lifestyleImage as SanityImageProps}
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  fill
                  className="absolute h-auto w-full object-cover"
                />
              </div>
            )}
            {gallery &&
              gallery.length > 0 &&
              gallery.map((item, index) => {
                if (item.type === 'figure') {
                  return (
                    <div
                      key={item.asset._ref && item.asset._ref}
                      className="aspect-h-4 aspect-w-3 relative h-full w-full"
                    >
                      {item.asset._ref && (
                        <SanityImage
                          priority={index === 0 || index === 1}
                          key={index}
                          image={item}
                          sizes="(max-width: 1024px) 100vw, 70vw"
                          fill
                          className="absolute h-auto w-full object-cover"
                        />
                      )}
                    </div>
                  );
                }
                if (item.type === 'mux.video') {
                  return (
                    <div
                      key={item.videoUrl && item.videoUrl}
                      className="aspect-h-4 aspect-w-3 relative mb-10 h-full w-full"
                    >
                      {item.videoUrl && (
                        <Video
                          playbackId={item.videoUrl}
                          resolution="HD"
                          loading={index === 0 || index === 1 ? 'eager' : 'lazy'}
                        />
                      )}
                    </div>
                  );
                }
                return null;
              })}
          </div>
          <div className="no-flex-grow sticky top-0 h-fit gap-y-10 lg:max-w-[560px]">
            <UspsMarquee usps={product.usps} size="sm" className="hidden lg:flex" />
            <div className="mt-6 lg:mt-10 lg:px-[84px]">
              <div className="flex flex-col">
                <div className="mb-[10px] flex items-center justify-between">
                  <div className="flex gap-2">
                    <DiscountBadge
                      variants={variants}
                      productType={product.type}
                      largestDiscount={product.largestDiscount}
                    />
                    <ScrollToRatingsButton>
                      <Rating sku={productSku} />
                    </ScrollToRatingsButton>
                  </div>
                  <Suspense fallback={<WishlistFallback />}>
                    <Wishlist gid={id} className="border border-brand-light-grey bg-[#F5F5F4]" />
                  </Suspense>
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
                <ProductPrice
                  currencyCode={product.minVariantPrice.currencyCode}
                  productType={product.type}
                  variants={variants}
                  minVariantPrice={product.minVariantPrice}
                  maxVariantPrice={product.maxVariantPrice}
                />
              </div>
              <div className="my-4 flex flex-col gap-8">
                {descriptionShort && (
                  <Text as="p" size="sm">
                    {descriptionShort}
                  </Text>
                )}
                {type === 'VARIABLE' && typeId && (
                  <ColorSelectLayout typeId={typeId} market={market} lang={lang} />
                )}
                <Suspense fallback={<ProductFormSkeleton />}>
                  <ProductForm
                    lang={lang}
                    productId={id}
                    type={type}
                    variants={variants}
                    options={options}
                    sizeGuide={product.sizeGuide}
                  />
                </Suspense>
                <div id="marker-element" className="hidden" style={{ height: '1px' }}></div>
              </div>
              <PaymentIcons market={market} />
              <USPCarousel
                type="normal"
                variants={variants}
                productType={product.type}
                lang={lang}
              />
              {product.faqs && <ProductFAQs faqs={product.faqs} lang={lang} />}
              <Suspense fallback={<CrossSellSkeleton className="mt-8" />}>
                <CrossSell
                  market={market}
                  lang={lang}
                  gid={product.id}
                  className="mt-8"
                  crossSellItemClassName="p-0 lg:p-0 mt-2"
                />
              </Suspense>
            </div>
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
      <Suspense>
        <ProductDescriptionAndReviews
          description={product.descriptionLongDetails}
          title={product.descriptionLongTitle}
          sku={productSku}
        />
      </Suspense>
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
    </>
  );
}
