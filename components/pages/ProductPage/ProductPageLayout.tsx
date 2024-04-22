import { Dictionary } from '@/app/dictionaries';
import { ProductForm } from '@/components/ProductForm';
import { ProductFormSkeleton } from '@/components/ProductForm/ProductFormSkeleton';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { ProductRating } from '@/components/lipscore/components';
import { ActiveVariantDescription } from '@/components/pages/ProductPage/ActiveVariantDescription';
import { Product } from '@/components/pages/ProductPage/hooks';
import { SanityImage } from '@/components/sanity/SanityImage';
import { MobileCarousel } from '@/components/shared/MobileCarousel';
import { ReccommendedProducts } from '@/components/shared/ReccommendedProducts';
import { LangValues, MarketValues } from '@/data/constants';
import { SearchParams } from '@/lib/types';
import { Suspense } from 'react';
import { ProductPrice } from './ProductPrice';

interface Props {
  data: Product;
  dictionary: Dictionary['product_page'];
  searchParams?: SearchParams;
  market: MarketValues;
  lang: LangValues;
}

export async function ProductPageLayout(props: Props) {
  const { data: product, dictionary, searchParams, market, lang } = props;

  if (!product) return null;

  // const { id, type, productType, description, title, variants, options, featuredOptions, usp } =
  //   product;

  const { gallery, title, id, type, descriptionShort, subtitle, variants, options } = product;
  const productSku = 'SOL002-002-021-40';

  // const productRating = await getLipscoreReviews(productSku);

  // console.log(getProductRating);

  // const parentGallery = productType?.gallery;
  // const parentAccordions = productType?.accordions;
  // const parentPageBuilder = productType?.pageBuilder;

  // const featuredImage = product.gallery?.[0] || product.productType?.gallery?.[0];

  // const gallery = [...(product.gallery || []), ...(parentGallery || [])];
  // const pageBuilder = [...(product.pageBuilder || []), ...(parentPageBuilder || [])];
  // const accordions = [...(product.accordions || []), ...(parentAccordions || [])];

  // const siblingProducts = productType?.products;

  return (
    <>
      {/* <ProductJsonLd
        productId={id}
        title={title}
        description={description ? toPlainText(description) : undefined}
        image={featuredImage ? urlForImage(featuredImage).url() : undefined}
      /> */}
      <div className="aspect-[3/4] lg:hidden">
        {gallery && gallery?.length > 0 && <MobileCarousel images={gallery} />}
      </div>
      <Section
        noTopPadding
        label="product-hero"
        srHeading="Product Hero"
        className="border-brand-border space-y-5 border-b bg-white lg:flex"
      >
        <Container className="relative flex flex-1 flex-col gap-x-0 xl:flex-row">
          <div className="hidden flex-grow justify-start lg:flex lg:flex-col ">
            <div className="relative">
              <div className="absolute right-0 top-0 z-10 p-4">
                <div className="mb-4 flex justify-center space-x-4">
                  <button className="flex-1 bg-gray-200 px-4 py-2 font-semibold text-black">
                    Female
                  </button>
                  <button className="flex-1 bg-gray-200 px-4 py-2 font-semibold text-black">
                    Male
                  </button>
                </div>
              </div>
            </div>
            {gallery &&
              gallery?.length > 0 &&
              gallery.map((image, index) => (
                <div
                  key={image.asset._ref}
                  className="aspect-h-4 aspect-w-3 relative mb-10 h-full w-full"
                >
                  <SanityImage
                    priority={index === 0 || index === 1}
                    key={index}
                    image={image}
                    sizes={'900px'}
                    fill
                    className="absolute h-auto w-full object-cover"
                  />
                </div>

                // </div>
              ))}
          </div>
          <div className="no-flex-grow sticky top-0 h-fit max-w-[560px] space-y-10">
            <p>USPS</p>
            <div className="px-[84px]">
              <div className="flex flex-col gap-y-3  pb-5">
                <div className="flex justify-between">
                  <div>
                    <p>-30%</p>
                    <ProductRating sku={productSku} />
                  </div>
                  <p>(Hjerte)</p>
                </div>

                <Heading as="h1" size="xs" className="font-bold">
                  {title}
                </Heading>
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
                <ActiveVariantDescription searchParams={searchParams} />
                {descriptionShort && (
                  <Text as="p" size="sm">
                    {descriptionShort}
                  </Text>
                )}
              </div>
              <div className="flex flex-col gap-y-8 lg:gap-y-6">
                {/* {siblingProducts && (
                <ColorSelector products={siblingProducts} colorText={dictionary.color} />
              )} */}
                <Suspense fallback={<ProductFormSkeleton />}>
                  <ProductForm productId={id} type={type} variants={variants} options={options} />
                </Suspense>
              </div>
            </div>

            <div>
              {/* {accordions && (
                <div className="divide-brand-border divide-y">
                  <Accordion type="single" collapsible>
                    {accordions.map((accordion, index) => (
                      <AccordionItem key={index} value={accordion.title}>
                        <AccordionTrigger>{accordion.title}</AccordionTrigger>
                        <AccordionContent>
                          <PortableTextRenderer value={accordion.richText} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )} */}
            </div>
          </div>
        </Container>
      </Section>
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
        <ReccommendedProducts lang={lang} />
      </Suspense>
    </>
  );
}
