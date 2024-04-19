import {
  SearchResult,
  getSearchResultQuery,
  searchResultValidator
} from '@/app/[market]/[lang]/(site)/search/hooks';
import { getDictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { CollectionGrid } from '@/components/pages/CollectionPage/CollectionLayout';
import { PageCounter } from '@/components/pages/CollectionPage/PageCounter';
import { PaginationButton } from '@/components/pages/CollectionPage/PaginationButton';
import { Filter } from '@/components/pages/CollectionPage/filter';
import { SearchSettingsBar } from '@/components/pages/CollectionPage/filter/SearchSettingsBar';
import { ProductCard } from '@/components/shared/ProductCard';
import { COLLECTION_PAGE_SIZE, MarketValues, URL_STATE_KEYS } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { ProductCardProps } from '@/lib/sanity/types';
import { productCardValidator } from '@/lib/sanity/validators';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
  robots: {
    follow: false,
    index: false
  }
};

interface LoadSearchProps {
  market: MarketValues;
  searchQuery: string;
  page: number;
  tagSlugs: string[] | null;
  sortKey?: string;
}

async function loadSearchResults({
  market,
  searchQuery,
  page,
  tagSlugs,
  sortKey
}: LoadSearchProps) {
  const sanityQuery = getSearchResultQuery(market, page, sortKey);

  return loadQuery<SearchResult | null>(
    sanityQuery,
    { searchQuery: `*${searchQuery}*`, tagSlugs },
    { next: { tags: [`search:${searchQuery}`, `tags:${tagSlugs?.join()}`, `sort:${sortKey}`] } }
  );
}

interface Props {
  searchParams?: {
    page: string | undefined;
    q: string | undefined;
    [key: string]: string | undefined;
  };
}

export default async function Page({ searchParams }: Props) {
  const page = searchParams?.page || '1';
  const searchValue = searchParams?.q || '';
  const currentPage = Number(page) || 1;
  const ProductsInView = searchParams?.view || '4';
  const sortKey = searchParams?.sort || 'default';

  const tagSlugs = formatSearchParams(searchParams);

  const market = await getMarket();
  const { search_page: dictionary, collection_page } = await getDictionary();

  const searchResult = await loadSearchResults({
    market,
    searchQuery: searchValue || '',
    page: currentPage,
    tagSlugs,
    sortKey
  });

  const searchResultWithoutNullValues = nullToUndefined(searchResult.data);

  const validProducts = searchResultWithoutNullValues.products.filter((product: any) => {
    const valided = productCardValidator.safeParse(product);
    if (valided.success) {
      return valided.data;
    }
  });
  const validatedSearchResult = searchResultValidator.parse({
    products: validProducts,
    productCount: validProducts.length,
    hasNextPage: searchResultWithoutNullValues.hasNextPage
  });

  const foundProducts = validatedSearchResult?.products;

  const pageCount =
    validatedSearchResult?.productCount &&
    Math.ceil(validatedSearchResult.productCount / COLLECTION_PAGE_SIZE);
  const hasNextPage = validatedSearchResult?.hasNextPage;

  const productIndicesToReceivePriorityProp = [0, 1, 2, 3];

  return (
    <>
      <Filter />
      <Section size="sm" label="collection-hero" srHeading="Collection hero">
        <Container>
          <div className="">
            {searchValue && (
              <Heading as="h1" size="lg">
                &quot;{searchValue}&quot;
              </Heading>
            )}
          </div>
        </Container>
        <SearchSettingsBar
          dictionary={collection_page}
          numberOfProducts={foundProducts?.length || 0}
          searchParams={searchParams}
        />
      </Section>
      <Section label={dictionary.search_results} srHeading={dictionary.search_results} noTopPadding>
        {/* <Container> */}
        <CollectionGrid number={ProductsInView}>
          {foundProducts &&
            foundProducts?.map((product: ProductCardProps, index) => (
              <ProductCard
                type={product.type}
                key={product.slug}
                slug={product.slug}
                title={product.title}
                mainImage={product.mainImage}
                lifestyleImage={product.lifestyleImage}
                badges={product.badges}
                priority={productIndicesToReceivePriorityProp.includes(index)}
              />
            ))}
        </CollectionGrid>
        <div className="mt-20 flex flex-col items-center justify-center space-y-8">
          <div className="flex gap-x-5">
            <PaginationButton type="previous">{dictionary.next_page}</PaginationButton>
            {hasNextPage && (
              <PaginationButton type="next">{dictionary.previous_page}</PaginationButton>
            )}
          </div>
          {pageCount ? <PageCounter pageCount={pageCount} /> : null}
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
