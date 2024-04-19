import { Dictionary } from '@/app/dictionaries';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion';
import { ProductForm } from '@/components/ProductForm';
import { ProductFormSkeleton } from '@/components/ProductForm/ProductFormSkeleton';
import { ProductJsonLd } from '@/components/ProductForm/ProductJsonLd';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { ActiveVariantDescription } from '@/components/pages/ProductPage/ActiveVariantDescription';
import { ColorSelector } from '@/components/pages/ProductPage/ColorSelector';
import { ProductDescription } from '@/components/pages/ProductPage/ProductDescription';
import { ProductPrice } from '@/components/pages/ProductPage/ProductPrice';
import { Product } from '@/components/pages/ProductPage/hooks';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { SanityImage } from '@/components/sanity/SanityImage';
import { MobileCarousel } from '@/components/shared/MobileCarousel';
import { PageBuilder } from '@/components/shared/PageBuilder';
import { PageBuilderBlock } from '@/components/shared/PageBuilder/hooks';
import { ReccommendedProducts } from '@/components/shared/ReccommendedProducts';
import { LangValues, MarketValues } from '@/data/constants';
import { env } from '@/env';
import { urlForImage } from '@/lib/sanity/image';
import { SearchParams } from '@/lib/types';
import { cn } from '@/lib/utils';
import { toPlainText } from '@portabletext/react';
import { Suspense } from 'react';

interface Props {
  data: Product;
  dictionary: Dictionary['product_page'];
  searchParams?: SearchParams;
  market: MarketValues;
  lang: LangValues;
}

export function ProductPageLayout(props: Props) {
  const { data: product, dictionary, searchParams, market, lang } = props;

  if (!product) return null;

  const { id, type, productType, description, title, variants, options, featuredOptions, usp } =
    product;

  const parentGallery = productType?.gallery;
  const parentAccordions = productType?.accordions;
  const parentPageBuilder = productType?.pageBuilder;

  const featuredImage = product.gallery?.[0] || product.productType?.gallery?.[0];

  const gallery = [...(product.gallery || []), ...(parentGallery || [])];
  const pageBuilder = [...(product.pageBuilder || []), ...(parentPageBuilder || [])];
  const accordions = [...(product.accordions || []), ...(parentAccordions || [])];

  const siblingProducts = productType?.products;

  return (
    <>
      <ProductJsonLd
        productId={id}
        title={title}
        description={description ? toPlainText(description) : undefined}
        image={featuredImage ? urlForImage(featuredImage).url() : undefined}
      />
      <div className="aspect-[3/4] lg:hidden">
        {gallery?.length > 0 && <MobileCarousel images={gallery} />}
      </div>
      <Section
        noTopPadding
        label="product-hero"
        srHeading="Product Hero"
        className="border-brand-border space-y-5 border-b bg-white lg:mt-10 lg:flex lg:gap-x-20 lg:space-y-10"
      >
        <Container className="sm:mb-16 relative flex flex-1 flex-col gap-x-0 md:gap-x-7 xl:flex-row xl:gap-x-14">
          <div className=" hidden flex-1 grid-cols-1 gap-3 self-start lg:grid xl:grid-cols-2">
            {gallery?.length > 0 &&
              gallery.map((image, index) => (
                <div
                  className={cn(
                    'aspect-h-4 aspect-w-3 relative h-full w-full',
                    image.width === '2-COL' ? 'col-span-2' : 'col-span-1'
                  )}
                  key={index}
                >
                  <SanityImage
                    priority={index === 0 || index === 1}
                    key={index}
                    image={image}
                    sizes={image.width === '2-COL' ? '1000px' : '600px'}
                    fill
                    className="absolute h-auto w-full object-cover"
                  />
                </div>
              ))}
          </div>
          <div className="sticky top-10 h-fit space-y-10 lg:max-w-[400px] lg:flex-[0_0_400px]">
            <div className="border-brand-border flex flex-col gap-y-3 border-b pb-5">
              <Heading as="h1" size="md">
                {title}
              </Heading>
              <ActiveVariantDescription searchParams={searchParams} />
              <ProductPrice
                currencyCode={env.NEXT_PUBLIC_SHOPIFY_CURRENCY}
                productType={product.type}
                variants={variants}
                priceRange={product.priceRange}
              />
            </div>
            <div className="flex flex-col gap-y-8 lg:gap-y-6">
              {siblingProducts && (
                <ColorSelector products={siblingProducts} colorText={dictionary.color} />
              )}
              <Suspense fallback={<ProductFormSkeleton />}>
                <ProductForm
                  productId={id}
                  type={type}
                  variants={variants}
                  featuredOptions={featuredOptions}
                  options={options}
                  usp={usp}
                />
              </Suspense>
            </div>
            <div>
              {description && (
                <ProductDescription
                  heading={dictionary.description}
                  content={description}
                  className="mb-10"
                />
              )}
              {accordions && (
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
              )}
            </div>
          </div>
        </Container>
      </Section>

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
        ))}

      <Suspense>
        <ReccommendedProducts lang={lang} />
      </Suspense>
    </>
  );
}
