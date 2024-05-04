import { Dictionary } from '@/app/dictionaries';
import { Media } from '@/components/Media';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { Breadcrumbs } from '@/components/pages/CollectionPage/Breadcrumbs';
import { PageCounter } from '@/components/pages/CollectionPage/PageCounter';
import { PaginationButton } from '@/components/pages/CollectionPage/PaginationButton';
import { ActiveFilters } from '@/components/pages/CollectionPage/filter/ActiveFilters';
import {
  Collection,
  CollectionMood,
  CollectionProductPayload
} from '@/components/pages/CollectionPage/hooks';
import { CollectionAndSearchActionsBarMobile } from '@/components/shared/CollectionAndSearchActionsBarMobile';
import { PageBuilder } from '@/components/shared/PageBuilder';
import { ProductCard } from '@/components/shared/ProductCard';
import { COLLECTION_PAGE_SIZE, LangValues, MarketValues } from '@/data/constants';
import { cn } from '@/lib/utils';
import '@/styles/externalOverride.css';
import { Suspense } from 'react';
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

  const mobileItems = insertMoodsMobile(products, (currentPage - 1) * 3, moods);
  const desktopItems = insertMoodsDesktop(products, (currentPage - 1) * 3, moods);

  const pageCount = Math.ceil(productCount / COLLECTION_PAGE_SIZE);
  const hasProducts = productCount !== 0;

  const imageSizePerItem = 100 / Number(productsPerRow) + 5;
  const sizes = `${imageSizePerItem}vw`;

  return (
    <>
      <CollectionAndSearchActionsBarMobile market={market} lang={lang} className="lg:hidden" />
      <Section
        size="sm"
        label="collection-hero"
        srHeading="Collection hero"
        hasBottomBorder={false}
        className="pb-8 pt-10 lg:pt-10"
      >
        <Container className="mb-2 lg:mb-4">
          <Breadcrumbs collectionName={title} lang={lang} />
        </Container>
        <Container className="flex flex-col justify-between gap-y-3 lg:flex-row lg:gap-y-0">
          {title && (
            <Heading as="h1" size="xl" className="max-w-lg font-bold">
              {title}
            </Heading>
          )}
          {descriptionShort && (
            <Text as="p" className="h-fit max-w-sm text-brand-mid-grey">
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
        className="hidden min-h-32 lg:block"
      />
      <Section label="collection-products" srHeading="Products" noTopPadding>
        <div className="lg:hidden">
          <CollectionGrid number={productsPerRow}>
            {mobileItems?.map((item, index) => {
              if (item.type === 'image' || item.type === 'video') {
                return (
                  <div
                    key={index}
                    className={cn(
                      'aspect-h-3 aspect-w-2 !relative m-[-1px] border border-brand-light-grey lg:aspect-none lg:h-auto lg:w-full'
                    )}
                  >
                    <Media media={item} loading={index === 0 ? 'eager' : 'lazy'} sizes={sizes} />
                  </div>
                );
              }
              const priorityIndices = [0, 1, 2];
              return (
                <div key={index} className="m-[-1px]">
                  <ProductCard
                    priority={priorityIndices.includes(index)}
                    product={item}
                    imageSizes={sizes}
                  />
                </div>
              );
            })}
          </CollectionGrid>
        </div>
        <div className="hidden lg:block">
          <CollectionGrid number={productsPerRow}>
            {desktopItems?.map((item, index) => {
              if (item.type === 'image' || item.type === 'video') {
                return (
                  <div
                    key={index}
                    className={cn(
                      '!relative m-[-1px] h-full w-full border border-brand-light-grey'
                    )}
                  >
                    <Media media={item} loading={index === 0 ? 'eager' : 'lazy'} sizes={sizes} />
                  </div>
                );
              }

              const priorityIndices = [0, 1, 2];
              return (
                <div className="m-[-1px]" key={index}>
                  <ProductCard
                    key={index}
                    priority={priorityIndices.includes(index)}
                    product={item}
                    imageSizes={sizes}
                  />
                </div>
              );
            })}
          </CollectionGrid>
        </div>
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
              <Suspense>
                <PaginationButton type="previous">Forrige side</PaginationButton>
              </Suspense>
              {hasNextPage && (
                <Suspense>
                  <PaginationButton type="next">Neste side</PaginationButton>
                </Suspense>
              )}
            </div>
            <Suspense>
              <PageCounter pageCount={pageCount} />
            </Suspense>
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
              <p
                className="text-md lg:text-lg"
                dangerouslySetInnerHTML={{ __html: descriptionLong.replace(/\n/g, '<br />') }}
              />
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

type ProductOrMood = CollectionProductPayload | CollectionMood;

function insertMoodsDesktop(
  products: CollectionProductPayload[],
  baseIndex: number,
  moods?: CollectionMood[]
): ProductOrMood[] {
  if (!moods || moods.length === 0) {
    return products;
  }

  const result: ProductOrMood[] = [...products];
  const moodsToInsert = moods.slice(baseIndex, baseIndex + 3);

  moodsToInsert.forEach((mood, index) => {
    let insertIndex = 0;
    if (index === 1) {
      insertIndex = 9;
    } else if (index === 2) {
      insertIndex = 14;
    }
    insertIndex = Math.min(insertIndex, result.length);
    result.splice(insertIndex, 0, mood);
  });

  return result;
}

function insertMoodsMobile(
  products: CollectionProductPayload[],
  baseIndex: number,
  moods?: CollectionMood[]
): ProductOrMood[] {
  if (!moods || moods.length === 0) {
    return products;
  }

  const result: ProductOrMood[] = [...products];
  const moodsToInsert = moods.slice(baseIndex, baseIndex + 3);

  moodsToInsert.forEach((mood, index) => {
    const insertIndex = Math.min(4 + index * 5, result.length);
    result.splice(insertIndex, 0, mood);
  });

  return result;
}

export function CollectionGrid({
  number,
  children,
  className
}: {
  number: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        '-gap-[1px]',
        number === '1' && 'grid grid-cols-1 lg:grid-cols-4',
        number === '2' && 'grid grid-cols-2 lg:grid-cols-4',
        number === '3' && 'grid grid-cols-2 lg:grid-cols-3',
        number === '4' && 'grid grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  );
}
