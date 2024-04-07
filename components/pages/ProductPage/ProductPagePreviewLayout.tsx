import { Dictionary } from '@/app/dictionaries';
import { Accordion, AccordionItem } from '@/components/Accordion';
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
import { SearchParams } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Props {
  data: Product;
  dictionary: Dictionary['product_page'];
  searchParams?: SearchParams;
}

export function ProductPagePreviewLayout(props: Props) {
  const { data: product, dictionary, searchParams } = props;

  const { gallery, productType, type, description, priceRange, title } = product;

  const isVariableProduct = type === 'VARIABLE';
  const isSimpleProduct = type === 'SIMPLE';

  const parentGallery = productType?.gallery;
  const parentAccordions = productType?.accordions;
  const parentPageBuilder = productType?.pageBuilder;

  const compositeGallery = [...(gallery || []), ...(parentGallery || [])];
  const compositePageBuilder = [...(product.pageBuilder || []), ...(parentPageBuilder || [])];
  const compositeAccordions = [...(product.accordions || []), ...(parentAccordions || [])];
  const siblingProducts = productType?.products;

  return (
    <>
      <div className="aspect-[3/4] lg:hidden">
        {compositeGallery?.length > 0 && <MobileCarousel images={compositeGallery} />}
      </div>
      <Section
        noTopPadding
        label="product-hero"
        srHeading="Product Hero"
        className="space-y-5 border-b border-brand-border bg-white lg:mt-10 lg:flex lg:gap-x-20 lg:space-y-10"
      >
        <Container className="sm:mb-16 relative flex flex-1 flex-col gap-x-0 md:gap-x-7 xl:flex-row xl:gap-x-14">
          <div className=" hidden flex-1 grid-cols-1 gap-3 self-start lg:grid xl:grid-cols-2">
            {compositeGallery?.length > 0 &&
              compositeGallery.map((image, index) => (
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
            <div className="flex flex-col gap-y-3 border-b border-brand-border pb-5">
              <Heading as="h1" size="md">
                {title}
              </Heading>
              {/* {<ProductRating rating={4.5} ratingCount={3} />} */}
              <ActiveVariantDescription searchParams={searchParams} />
              <ProductPrice
                currencyCode={priceRange.minVariantPrice.currencyCode}
                productType={type}
                price={isSimpleProduct ? product.price : undefined}
                compareAtPrice={isSimpleProduct ? product.compareAtPrice : undefined}
                variants={isVariableProduct ? product.variants : undefined}
                minVariantPrice={priceRange.minVariantPrice?.amount}
                maxVariantPrice={priceRange.maxVariantPrice?.amount}
              />
            </div>
            <div className="flex flex-col gap-y-8 lg:gap-y-6">
              {siblingProducts && (
                <ColorSelector products={siblingProducts} colorText={dictionary.color} />
              )}
            </div>
            <div>
              {description && (
                <ProductDescription
                  heading={dictionary.description}
                  content={description}
                  className="mb-10"
                />
              )}
              {compositeAccordions && (
                <div className="divide-y divide-brand-border">
                  <Accordion>
                    {compositeAccordions.map((accordion, index) => (
                      <AccordionItem key={index} title={accordion.title}>
                        <PortableTextRenderer value={accordion.richText} />
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {compositePageBuilder?.length > 0 &&
        compositePageBuilder.map((block: PageBuilderBlock, index: number) => (
          <PageBuilder key={index} data={block} index={index} />
        ))}
    </>
  );
}
