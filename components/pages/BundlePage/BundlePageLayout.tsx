import { Dictionary } from '@/app/dictionaries';
import { Accordion, AccordionItem } from '@/components/Accordion';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { ProductRating } from '@/components/pages/ProductPage/ProductRating';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { SanityImage } from '@/components/sanity/SanityImage';
import { MobileCarousel } from '@/components/shared/MobileCarousel';
import { ReccommendedProducts } from '@/components/shared/ReccommendedProducts';
import { urlForImage } from '@/lib/sanity/image';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import { AddBundleToCartButton } from './BundleButtons';
import { BundlePrice } from './BundlePrice';
import { BundleSelections } from './BundleSelections';

interface Props {
  data: any;
  dictionary: Dictionary['product_page'];
  params?: { [key: string]: string | string[] | undefined };
}

export async function BundlePageLayout(props: Props) {
  const { data: product, dictionary, params } = props;

  if (!product) return null;

  const { gallery, productType, description, items, id } = product;

  const currencyCode = items[0].product[0].priceRange.minVariantPrice.currencyCode;

  const maxPrice = getMaxPrice(items);
  const minPrice = getMinPrice(items);

  const parentGallery = productType?.gallery;
  const parentAccordions = productType?.accordions;

  const featuredImage = product.gallery?.[0] || product.productType?.gallery?.[0];

  const inStock = true;

  const skuLength = 110;

  const outArray = [];

  for (let i = 0; i < skuLength; i++) {
    const data = {
      price: 4.99,
      optionValues: [
        {
          name: `sku_${i}`,
          optionName: 'Size'
        }
      ]
    };
    outArray.push(data);
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: featuredImage ? urlForImage(featuredImage).url() : undefined,
    offers: {
      '@type': 'AggregateOffer',
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
      // priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      // highPrice: product.priceRange.maxVariantPrice.amount,
      // lowPrice: product.priceRange.minVariantPrice.amount,
    }
  };

  const compositeGallery = [...(gallery || []), ...(parentGallery || [])];
  const compositePageBuilder = [
    ...(product.pageBuilder || []),
    ...(productType?.pageBuilder || [])
  ];

  const hasProductRating = true;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
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
          <div className="hidden flex-1 grid-cols-1 gap-3 self-start lg:grid xl:grid-cols-2">
            {compositeGallery?.length > 0 &&
              compositeGallery.map((image, index) => (
                <div
                  className={cn('relative', image.width === '2-COL' ? 'col-span-2' : 'col-span-1')}
                  key={index}
                >
                  <SanityImage
                    key={index}
                    image={image}
                    sizes={image.width === '2-COL' ? '1000px' : '600px'}
                    className="h-auto w-full"
                  />
                </div>
              ))}
          </div>
          <div className="sticky top-0 space-y-10 lg:max-w-[400px] lg:flex-[0_0_400px]">
            <div className="flex flex-col gap-y-3 border-b border-brand-border pb-5">
              <Heading as="h1" size="lg">
                {product.title}
              </Heading>
              {hasProductRating && <ProductRating rating={4.5} ratingCount={3} />}
              {/* suspense on price */}
              <BundlePrice
                items={items}
                currencyCode={currencyCode}
                discountPercentage={product.discountPercentage}
                minVariantPrice={minPrice}
                maxVariantPrice={maxPrice}
              />
            </div>

            <BundleSelections slug={product.slug} />
            {/* stock here suspense */}
            <AddBundleToCartButton
              items={items}
              bundleId={product.id}
              text={dictionary.add_to_cart}
              availableForSale={true}
              discountPercentage={product.discountPercentage}
            />
            <div>
              {description && (
                <div className="mb-10">
                  <Heading as="h2" size="sm" className="mb-[-12px]">
                    Beskrivelse
                  </Heading>
                  <PortableTextRenderer value={description} />
                </div>
              )}
              {parentAccordions && (
                <div className="divide-y divide-brand-border">
                  <Accordion>
                    {parentAccordions.map((accordion: any, index: number) => (
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

      {/* <ProductReviews
      data={MOCK_REVIEW_DATA}
      productId={extractIdFromGid('123')}
    /> */}

      {/* {compositePageBuilder?.length > 0 &&
        compositePageBuilder.map((block: PageBuilderBlock, index: number) => (
          <PageBuilder key={index} data={block} index={index} />
        ))} */}

      <Suspense>
        <ReccommendedProducts />
      </Suspense>
    </>
  );
}
interface ProductBundleProps {
  slug: string;
  title: string;
  type: string;
  options: Array<{
    title: string;
    slug: string;
    options: string[];
  }>;
  variants: {
    _id: string;
    sku: string;
    barcode: string;
    option1: string;
    option2?: string;
    option3?: string;
    price: number;
  }[];
}

export interface tempBundleProps {
  internalTitle: string;
  numberOfItems: number;
  product: ProductBundleProps[];
}

// Function to create the activeBundle structure
// export function createActiveBundle(data: tempBundleProps[], bundleVariants: string[]) {
//   // console.log(JSON.stringify(data));
//   const activeBundleSet: Set<string> = new Set();
//   const activeBundle: ActiveVariants[] = [];

//   data.forEach((item) => {
//     item.product.forEach((product: any) => {
//       product.variants.forEach((variant: any) => {
//         if (bundleVariants.includes(variant.sku)) {
//           console.log('BundleVariants matched with ', bundleVariants, variant.sku);

//           // Create a unique identifier for each variant.
//           const uniqueId = `${variant.gid}-${item.numberOfItems}-${product.title}-${variant.option1}`;

//           if (!activeBundleSet.has(uniqueId)) {
//             activeBundleSet.add(uniqueId); // Add the unique identifier to the Set.

//             activeBundle.push({
//               gid: variant.gid,
//               numberOfItems: item.numberOfItems,
//               title: `${product.title} - ${variant.option1}`
//             });
//           }
//         }
//       });
//     });
//   });

//   return activeBundle;
// }

function getMaxPrice(items: any[]) {
  let maxPrice = 0;
  items.forEach((item) => {
    let maxSegmentPrice = 0;
    item.product.forEach((product: any) => {
      product.variants.forEach((variant: any) => {
        if (variant.price > maxSegmentPrice) {
          maxSegmentPrice = variant.price;
        }
      });
    });
    maxSegmentPrice = maxSegmentPrice * item.numberOfItems;
    maxPrice += maxSegmentPrice;
  });

  return maxPrice;
}
function getMinPrice(items: any[]) {
  let minPrice = 0;
  items.forEach((item) => {
    let minSegmentPrice = 0;
    item.product.forEach((product: any) => {
      product.variants.forEach((variant: any) => {
        if (minSegmentPrice === 0) {
          minSegmentPrice = variant.price;
        }
        if (variant.price < minSegmentPrice) {
          minSegmentPrice = variant.price;
        }
      });
    });
    minSegmentPrice = minSegmentPrice * item.numberOfItems;
    minPrice += minSegmentPrice;
  });

  return minPrice;
}
