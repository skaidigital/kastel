import { Dictionary } from '@/app/dictionaries';
import { HotspotImage } from '@/components/HotspotImage';
import { ProductForm } from '@/components/ProductForm';
import { ProductFormSkeleton } from '@/components/ProductForm/ProductFormSkeleton';
import Video from '@/components/Video';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { Product } from '@/components/pages/ProductPage/hooks';
import { SanityImage } from '@/components/sanity/SanityImage';
import { CrossSell } from '@/components/shared/Cart/CrossSell';
import { CrossSellSkeleton } from '@/components/shared/Cart/CrossSell/CrossSellSkeleton';
import { MobileCarousel } from '@/components/shared/MobileCarousel';
import { Rating } from '@/components/shared/ProductCard/Rating';
import { Wishlist, WishlistFallback } from '@/components/shared/ProductCard/Wishlist';
import { ReccommendedProducts } from '@/components/shared/ReccommendedProducts';
import { LangValues, MarketValues } from '@/data/constants';
import { SearchParams } from '@/lib/types';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { ColorSelectLayout } from './ColorSelectLayout';
import { DiscountPill } from './DiscountPill';
import { GenderImageButton } from './GenderImageButton';
import { PaymentIcons } from './PaymentIcons';
import { ProductDescriptionAndReviews } from './ProductDescriptionAndReviews';
import { ProductFAQs } from './ProductFAQs';
import { ProductPrice } from './ProductPrice';
import { USPCarousel } from './USPCarousel';
import { UspsMarquee } from './Usps';

interface Props {
  data: Product;
  dictionary: Dictionary['product_page'];
  searchParams?: SearchParams;
  market: MarketValues;
  lang: LangValues;
}

// TODO add back prodctJsonLd
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
    typeId
  } = product;

  console.log('product faqs', product.faqs);

  const productSku = 'SOL002-002-021-40';

  return (
    <>
      {/* <ProductJsonLd
        productId={id}
        title={title}
        description={description ? toPlainText(description) : undefined}
        image={featuredImage ? urlForImage(featuredImage).url() : undefined}
      /> */}
      {gallery && gallery.length > 0 && (
        <MobileCarousel mainImage={mainImage} lifestyleImage={lifestyleImage} items={gallery} />
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
                  sizes={'70vw'}
                  fill
                  className="absolute h-auto w-full object-cover"
                />
              </div>
            )}
            {lifestyleImage && (
              <div className="aspect-h-4 aspect-w-3 relative h-full w-full">
                <SanityImage
                  priority
                  image={lifestyleImage}
                  sizes={'70vw'}
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
                          sizes={'70vw'}
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
                    <DiscountPill variants={variants} productType={product.type} />
                    <Rating sku={productSku} />
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
                <Suspense>
                  <ColorSelectLayout typeId={typeId} market={market} lang={lang} />
                </Suspense>
                <Suspense fallback={<ProductFormSkeleton />}>
                  <ProductForm
                    productId={id}
                    type={type}
                    variants={variants}
                    options={options}
                    sizeGuide={product.sizeGuide}
                  />
                </Suspense>
              </div>
              <PaymentIcons market={market} />
              <USPCarousel variants={variants} productType={product.type} />
              {product.faqs && <ProductFAQs faqs={product.faqs} lang={lang} />}
              <Suspense fallback={<CrossSellSkeleton className="mt-8" />}>
                <CrossSell market={market} lang={lang} className="mt-8" />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>
      {product.hotspotImage && product.hotspotImage.hotspots && (
        <div className="aspect-h-9 aspect-w-16 h-0 w-full">
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
      />
      {/* 
      {pageBuilder?.length > 0 &&
        pageBuilder.map((block: PageBuilderBlock, index: number) => (
          <PageBuilder
            key={index}
            data={block}
            index={index}
            market={market}
            lang={lang}
            pageId={productType?.id || ''}
            pageType="productType"
          />
        ))} */}

      <Suspense>
        <ReccommendedProducts lang={lang} market={market} />
      </Suspense>
    </>
  );
}
