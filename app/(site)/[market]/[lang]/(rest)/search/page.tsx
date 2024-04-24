import {
  SearchResult,
  getSearchResultQuery,
  searchResultValidator
} from '@/app/(site)/[market]/[lang]/(rest)/search/hooks';
import { getDictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { CollectionGrid } from '@/components/pages/CollectionPage/CollectionLayout';
import { PageCounter } from '@/components/pages/CollectionPage/PageCounter';
import { PaginationButton } from '@/components/pages/CollectionPage/PaginationButton';
import { SearchSettingsBar } from '@/components/pages/CollectionPage/filter/SearchSettingsBar';
import { ProductCard } from '@/components/shared/ProductCard';
import { COLLECTION_PAGE_SIZE, LangValues, URL_STATE_KEYS } from '@/data/constants';
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
  lang: LangValues;
  searchQuery: string;
  page: number;
  tagSlugs: string[] | null;
  sortKey?: string;
}

async function loadSearchResults({ lang, searchQuery, page, tagSlugs, sortKey }: LoadSearchProps) {
  const sanityQuery = getSearchResultQuery(lang, page, sortKey);

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
  params: { lang: LangValues };
}

// TODO reintroduce search params
export default async function Page({ searchParams, params }: Props) {
  const { lang } = params;
  const page = searchParams?.page || '1';
  const searchValue = searchParams?.q || '';
  const currentPage = Number(page) || 1;
  const ProductsInView = searchParams?.view || '4';
  const sortKey = searchParams?.sort || 'default';

  const tagSlugs = formatSearchParams(searchParams);

  const { search_page: dictionary, collection_page } = await getDictionary();

  const searchResult = await loadSearchResults({
    lang,
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
    products: validProducts.length > 0 ? validProducts : undefined,
    productCount: validProducts.length,
    hasNextPage: searchResultWithoutNullValues.hasNextPage
  });

  const productCount = validatedSearchResult?.products;
  const hasProducts = productCount && productCount?.length > 0;

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
        className="pb-8 lg:pb-10"
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
                {productCount?.length} {dictionary.no_products_that_match}
              </span>
            ) : (
              <span className="text-sm text-brand-mid-grey lg:text-lg">
                {dictionary.search_results}
              </span>
            )}
          </div>
          {hasProducts && <SearchSettingsBar />}
        </Container>
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
          {productCount &&
            productCount?.map((product: ProductCardProps, index) => (
              <ProductCard
                type={product.type}
                gid={product.gid}
                sku={product.sku}
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