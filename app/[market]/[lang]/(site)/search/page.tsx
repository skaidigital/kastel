import {
  SearchResult,
  getSearchResultQuery,
  searchResultValidator
} from '@/app/[market]/[lang]/(site)/search/hooks';
import { getDictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { Grid } from '@/components/base/Grid';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { PageCounter } from '@/components/pages/CollectionPage/PageCounter';
import { PaginationButton } from '@/components/pages/CollectionPage/PaginationButton';
import { ProductCard } from '@/components/shared/ProductCard';
import { COLLECTION_PAGE_SIZE, MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { ProductCardProps } from '@/lib/sanity/types';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
  robots: {
    follow: false,
    index: false
  }
};

async function loadSearchResults({
  market,
  searchQuery,
  page
}: {
  market: MarketValues;
  searchQuery: string;
  page: number;
}) {
  const sanityQuery = getSearchResultQuery(market, page);

  return loadQuery<SearchResult | null>(
    sanityQuery,
    { searchQuery },
    { next: { tags: [`search:${searchQuery}`] } }
  );
}

export default async function Page({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue, page } = searchParams as { [key: string]: string };

  const currentPage = Number(page) || 1;

  const market = await getMarket();
  const { search_page: dictionary } = await getDictionary();

  const searchResult = await loadSearchResults({
    market,
    searchQuery: searchValue || '',
    page: currentPage
  });

  const searchResultWithoutNullValues = nullToUndefined(searchResult.data);
  const validatedSearchResult = searchResultValidator.parse(searchResultWithoutNullValues);

  const foundProducts = validatedSearchResult?.products;

  const pageCount =
    validatedSearchResult?.productCount &&
    Math.ceil(validatedSearchResult.productCount / COLLECTION_PAGE_SIZE);
  const hasNextPage = validatedSearchResult?.hasNextPage;

  const resultsText =
    foundProducts && foundProducts?.length > 1 ? dictionary.results : dictionary.result;

  const productIndicesToReceivePriorityProp = [0, 1, 2, 3];

  return (
    <Container>
      <Section size="sm" label="collection-hero" srHeading="Collection hero">
        <div className="flex flex-col items-center  justify-center space-y-3">
          <Heading as="h1" size="lg">
            Search
          </Heading>
          {searchValue && foundProducts ? (
            <Text as="p">
              {foundProducts?.length === 0
                ? dictionary.no_products_that_match
                : `${dictionary.showing} ${foundProducts.length} ${resultsText} ${dictionary.for} `}
              <span className="font-bold">&quot;{searchValue}&quot;</span>
            </Text>
          ) : null}
        </div>
      </Section>
      <Section label={dictionary.search_results} srHeading={dictionary.search_results} noTopPadding>
        <Container>
          <Grid>
            {foundProducts?.map((product: ProductCardProps, index) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                title={product.title}
                image={product.image}
                hoverImage={product.hoverImage}
                badges={product.badges}
                priority={productIndicesToReceivePriorityProp.includes(index)}
              />
            ))}
          </Grid>
          <div className="mt-20 flex flex-col items-center justify-center space-y-8">
            <div className="flex gap-x-5">
              <PaginationButton type="previous">{dictionary.next_page}</PaginationButton>
              {hasNextPage && (
                <PaginationButton type="next">{dictionary.previous_page}</PaginationButton>
              )}
            </div>
            {pageCount ? <PageCounter pageCount={pageCount} /> : null}
          </div>
        </Container>
      </Section>
    </Container>
  );
}
