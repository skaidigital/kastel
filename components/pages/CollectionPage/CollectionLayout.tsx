import { Dictionary } from '@/app/dictionaries';
import { Card } from '@/components/Card';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { CollectionActionsBarMobile } from '@/components/pages/CollectionPage/CollectionActionsBarMobile';
import { PageCounter } from '@/components/pages/CollectionPage/PageCounter';
import { PaginationButton } from '@/components/pages/CollectionPage/PaginationButton';
import { ActiveFilters } from '@/components/pages/CollectionPage/filter/ActiveFilters';
import {
  Collection,
  CollectionMood,
  CollectionProductPayload
} from '@/components/pages/CollectionPage/hooks';
import { PageBuilder } from '@/components/shared/PageBuilder';
import { ProductCard } from '@/components/shared/ProductCard';
import { COLLECTION_PAGE_SIZE, LangValues, MarketValues } from '@/data/constants';
import { cn } from '@/lib/utils';
import { CollectionSettingsBarDesktop } from './CollectionSettingsBarDesktop';

interface Props {
  data: Collection;
  currentPage: number;
  searchParams?: {
    [key: string]: string | undefined;
  };
  dictionary: Dictionary['collection_page'];
  market: MarketValues;
  lang: LangValues;
}

export function CollectionLayout({
  data,
  currentPage,
  searchParams,
  dictionary,
  market,
  lang
}: Props) {
  const {
    id,
    products,
    moods,
    title,
    hasNextPage,
    productCount,
    descriptionLong,
    descriptionShort,
    pageBuilder
  } = data;
  const productsPerRow = searchParams?.view || '4';

  const collection = adjustProductsWithMoods({
    products,
    moods,
    currentPageIndex: currentPage
  });

  const pageCount = Math.ceil(productCount / COLLECTION_PAGE_SIZE);
  const hasProducts = productCount !== 0;

  return (
    <>
      <CollectionActionsBarMobile lang={lang} className="lg:hidden" />
      <Section
        size="sm"
        label="collection-hero"
        srHeading="Collection hero"
        hasBottomBorder={false}
        className="pb-8 pt-10 lg:pt-10"
      >
        <Container className="flex flex-col justify-between gap-y-3 lg:flex-row lg:gap-y-0">
          {title && (
            <Heading as="h1" size="xl" className="max-w-lg font-bold">
              {title}
            </Heading>
          )}
          {descriptionShort && (
            <Text as="p" className="max-w-sm text-brand-mid-grey">
              {descriptionShort}
            </Text>
          )}
          <ActiveFilters searchParams={searchParams} className="mt-3 lg:hidden" />
        </Container>
      </Section>
      <CollectionSettingsBarDesktop
        searchParams={searchParams}
        numberOfProducts={productCount}
        dictionary={dictionary}
        lang={lang}
        className="hidden lg:block"
      />
      <Section label="collection-products" srHeading="Products" noTopPadding>
        <CollectionGrid number={productsPerRow}>
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

            return (
              <ProductCard
                key={index}
                type={item.type}
                title={item.title}
                slug={item.slug}
                mainImage={item.mainImage}
                lifestyleImage={item.lifestyleImage}
                badges={item.badges}
                priority={priorityIndices.includes(index)}
              />
            );
          })}
        </CollectionGrid>
        {!hasProducts && (
          <Container className="lg:mt-10">
            <Text as="p" size="lg">
              {dictionary.no_products}
            </Text>
          </Container>
        )}
        {hasProducts && (
          <div className="mt-20 flex flex-col items-center justify-center space-y-8">
            <div className="flex gap-x-2">
              <PaginationButton type="previous">Forrige side</PaginationButton>
              {hasNextPage && <PaginationButton type="next">Neste side</PaginationButton>}
            </div>
            <PageCounter pageCount={pageCount} />
          </div>
        )}
      </Section>
      <Section label="description-long-products" srHeading="Description">
        <Container className="grid gap-2 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:col-start-2">
            <h2 className="mb-4 text-overline-md font-medium uppercase text-brand-mid-grey">
              {dictionary.description}:
            </h2>
            {descriptionLong && (
              <Text as="p" className="text-md lg:text-lg">
                {descriptionLong}
              </Text>
            )}
          </div>
        </Container>
      </Section>
      {pageBuilder?.map((block, index: number) => (
        <PageBuilder
          key={block.key}
          data={block}
          index={index}
          market={market}
          lang={lang}
          pageId={id}
          pageType={'collection'}
        />
      ))}
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

export function CollectionGrid({
  number,
  children
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        number === '1' && 'grid grid-cols-1 lg:grid-cols-4',
        number === '2' && 'grid grid-cols-2 lg:grid-cols-4',
        number === '3' && 'grid grid-cols-2 lg:grid-cols-3',
        number === '4' && 'grid grid-cols-2 lg:grid-cols-4'
      )}
    >
      {children}
    </div>
  );
}
