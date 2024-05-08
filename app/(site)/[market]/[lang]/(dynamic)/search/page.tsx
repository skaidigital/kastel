import {
  SearchResult,
  getSearchResultQuery,
  searchResultValidator
} from '@/app/(site)/[market]/[lang]/(dynamic)/search/hooks';
import { getDictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { CollectionGrid } from '@/components/pages/CollectionPage/CollectionLayout';
import { PageCounter } from '@/components/pages/CollectionPage/PageCounter';
import { PaginationButton } from '@/components/pages/CollectionPage/PaginationButton';
import { ActiveFilters } from '@/components/pages/CollectionPage/filter/ActiveFilters';
import { SearchSettingsBar } from '@/components/pages/CollectionPage/filter/SearchSettingsBar';
import { CollectionAndSearchActionsBarMobile } from '@/components/shared/CollectionAndSearchActionsBarMobile';
import { ProductCard } from '@/components/shared/ProductCard';
import { COLLECTION_PAGE_SIZE, LangValues, MarketValues, URL_STATE_KEYS } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { ProductCardProps } from '@/lib/sanity/types';
import { productCardValidator } from '@/lib/sanity/validators';
import { Suspense } from 'react';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
  robots: {
    follow: false,
    index: false
  }
};

interface LoadSearchProps {
  lang: LangValues;
  market: MarketValues;
  searchQuery: string;
  page: number;
  tagSlugs: string[] | null;
  sortKey?: string;
}

async function loadSearchResults({
  lang,
  market,
  searchQuery,
  page,
  tagSlugs,
  sortKey
}: LoadSearchProps) {
  const sanityQuery = getSearchResultQuery(lang, market, page, sortKey);

  return loadQuery<SearchResult | null>(
    sanityQuery,
    { searchQuery: `*${searchQuery}*`, tagSlugs },
    { cache: 'no-store' }
  );
}

interface Props {
  searchParams?: {
    page: string | undefined;
    q: string | undefined;
    [key: string]: string | undefined;
  };
  params: { lang: LangValues; market: MarketValues };
}

// TODO reintroduce search params
export default async function Page({ searchParams, params }: Props) {
  const { lang, market } = params;
  const page = searchParams?.page || '1';
  const searchValue = searchParams?.q || '';
  const currentPage = Number(page) || 1;
  const ProductsInView = searchParams?.view || '4';
  const sortKey = searchParams?.sort || 'default';

  const tagSlugs = formatSearchParams(searchParams);

  const { search_page: dictionary, collection_page } = await getDictionary({ lang });

  const searchResult = await loadSearchResults({
    lang,
    market,
    searchQuery: searchValue || '',
    page: currentPage,
    tagSlugs,
    sortKey
  });

  const searchResultWithoutNullValues = nullToUndefined(searchResult.data);

  const validProducts = searchResultWithoutNullValues.products.filter((product: any) => {
    const validatedProduct = productCardValidator.safeParse(product);

    if (validatedProduct.success) {
      return validatedProduct.data;
    }
  });

  const validatedSearchResult = searchResultValidator.parse({
    products: validProducts.length > 0 ? validProducts : undefined,
    productCount: validProducts.length,
    hasNextPage: searchResultWithoutNullValues.hasNextPage
  });

  const products = validatedSearchResult?.products;

  const hasProducts = products && products?.length > 0;

  const pageCount =
    validatedSearchResult?.productCount &&
    Math.ceil(validatedSearchResult.productCount / COLLECTION_PAGE_SIZE);
  const hasNextPage = validatedSearchResult?.hasNextPage;

  const productIndicesToReceivePriorityProp = [0, 1, 2, 3];

  return (
    <>
      {/* <Filter /> */}
      <Section
        size="sm"
        label="collection-hero"
        srHeading="Collection hero"
        hasBottomBorder={false}
        className="pb-8 pt-10 lg:pt-10"
      >
        <Container className="flex items-end justify-between">
          <div className="flex flex-col gap-y-3 lg:gap-y-4">
            {searchValue && (
              <Heading as="h1" size="xl">
                &quot;{searchValue}&quot;
              </Heading>
            )}
            {hasProducts ? (
              <span className="text-sm text-brand-mid-grey lg:text-lg">
                {dictionary.we_found} {products?.length} {dictionary.products}
              </span>
            ) : (
              <span className="text-sm text-brand-mid-grey lg:text-lg">
                {dictionary.search_results}
              </span>
            )}
            <ActiveFilters className="mt-3 lg:hidden" />
          </div>
          <CollectionAndSearchActionsBarMobile market={market} lang={lang} className="lg:hidden" />
        </Container>
        <SearchSettingsBar
          searchParams={searchParams}
          market={market}
          lang={lang}
          className="hidden min-h-32 lg:block"
        />
      </Section>
      <Section label={dictionary.search_results} srHeading={dictionary.search_results} noTopPadding>
        {!hasProducts && (
          <Container className="lg:mt-10">
            <Text as="p" size="lg">
              {dictionary.no_products_that_match}
            </Text>
          </Container>
        )}
        <CollectionGrid number={ProductsInView}>
          {products &&
            products?.map((product: ProductCardProps, index) => {
              return (
                <div className="m-[-1px]" key={product.slug}>
                  <ProductCard
                    priority={productIndicesToReceivePriorityProp.includes(index)}
                    product={product}
                  />
                </div>
              );
            })}
        </CollectionGrid>
        <div className="mt-20 flex flex-col items-center justify-center space-y-8">
          <div className="flex gap-x-5">
            {currentPage > 1 && (
              <Suspense>
                <PaginationButton type="previous">{dictionary.previous_page}</PaginationButton>
              </Suspense>
            )}
            {hasNextPage && (
              <Suspense>
                <PaginationButton type="next">{dictionary.next_page}</PaginationButton>
              </Suspense>
            )}
          </div>
          {pageCount ? (
            <Suspense>
              <PageCounter pageCount={pageCount} />
            </Suspense>
          ) : null}
        </div>
      </Section>
    </>
  );
}

function formatSearchParams(search: Props['searchParams']) {
  const paramValues = search
    ? Object.entries(search)
        .filter(([key]) => !Object.values(URL_STATE_KEYS).includes(key))
        .flatMap(([_, value]) => value?.split(',') ?? [])
        .filter((value) => value !== undefined)
    : null;

  if (paramValues?.length === 0) {
    return null;
  }
  return paramValues;
}
