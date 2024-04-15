'use client';

import { Card } from '@/components/Card';
import { Grid } from '@/components/base/Grid';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { PageCounter } from '@/components/pages/CollectionPage/PageCounter';
import { PaginationButton } from '@/components/pages/CollectionPage/PaginationButton';
import {
  Collection,
  CollectionMood,
  CollectionProductPayload
} from '@/components/pages/CollectionPage/hooks';
import { ProductCard } from '@/components/shared/ProductCard';
import { COLLECTION_PAGE_SIZE } from '@/data/constants';
import { cn } from '@/lib/utils';

interface Props {
  data: Collection;
  currentPage: number;
}

export function CollectionLayout({ data, currentPage }: Props) {
  const { products, moods, title, hasNextPage, productCount } = data;

  const collection = adjustProductsWithMoods({
    products,
    moods,
    currentPageIndex: currentPage
  });

  const pageCount = Math.ceil(productCount / COLLECTION_PAGE_SIZE);

  return (
    <>
      <Section size="sm" label="collection-hero" srHeading="Collection hero">
        <div className="relative flex items-center justify-center">
          <Heading as="h1" size="lg">
            {title}
            <Text size="lg" className="ml-1">
              ({productCount})
            </Text>
          </Heading>
        </div>
      </Section>
      <Section label="collection-products" srHeading="Products" noTopPadding>
        <Grid>
          {collection?.map((item, index) => {
            if ('card' in item) {
              const size = item.size;
              return (
                <div
                  key={item.card.title}
                  className={cn(
                    'aspect-h-3 aspect-w-2 !relative col-span-2 lg:aspect-none lg:h-auto lg:w-full',
                    size === 'large' ? 'lg:col-span-2' : 'lg:col-span-1'
                  )}
                >
                  <Card
                    card={item.card}
                    sizes={'(min-width: 1024px) 50vw, 100vw'}
                    priority={index === 0}
                  />
                </div>
              );
            }

            const priorityIndices = [0, 1, 2];

            const hasLifestyleImage = item.lifestyleImage ? true : false;
            const wantsLifestyleImageFirst = item.firstImage === 'lifestyle';
            const preferredFirstImage = item.firstImage;

            const image =
              hasLifestyleImage && wantsLifestyleImageFirst ? item.lifestyleImage : item.mainImage;
            const hoverImage =
              preferredFirstImage === 'lifestyle' ? item.mainImage : item.lifestyleImage;

            return (
              <ProductCard
                key={index}
                title={item.title}
                slug={item.slug}
                // TODO figure out how to fix this undefined
                image={image}
                hoverImage={hoverImage}
                badges={item.badges}
                priority={priorityIndices.includes(index)}
              />
            );
          })}
        </Grid>
        <div className="mt-20 flex flex-col items-center justify-center space-y-8">
          <div className="flex gap-x-5">
            <PaginationButton type="previous">Forrige side</PaginationButton>
            {hasNextPage && <PaginationButton type="next">Neste side</PaginationButton>}
          </div>
          <PageCounter pageCount={pageCount} />
        </div>
      </Section>
    </>
  );
}

export function adjustProductsWithMoods({
  products,
  moods,
  currentPageIndex = 1
}: {
  products: CollectionProductPayload[];
  moods?: CollectionMood[];
  currentPageIndex: number;
}) {
  if (!moods || moods.length === 0) {
    return products;
  }

  type ProductOrMood = CollectionProductPayload | CollectionMood;
  const result: ProductOrMood[] = [];

  // Initialize result with products to ensure all indices exist
  products.forEach((product) => result.push(product));

  const baseIndex = (currentPageIndex - 1) * 3;

  moods.slice(baseIndex, baseIndex + 3).forEach((mood, index) => {
    let insertIndex: number;

    // Check if the device is a desktop directly using matchMedia.
    if (window.matchMedia('(min-width: 768px)').matches) {
      // Desktop behavior here.
      if (index === 0) {
        insertIndex = 0;
      } else if (index === 1) {
        insertIndex = mood.size === 'large' ? 9 : 10;
      } else {
        // index === 2
        insertIndex = 14;
      }
    } else {
      // Mobile behavior here.

      insertIndex = 4 + index * 5;
    }

    // Adjust insertIndex for the existing content
    insertIndex = Math.min(insertIndex, result.length);

    // Insert mood at the calculated position
    result.splice(insertIndex, 0, mood);
  });

  // Trim the array if it's longer than the original products plus inserted moods
  return result.slice(0, products.length + Math.min(3, moods.length - baseIndex));
}
