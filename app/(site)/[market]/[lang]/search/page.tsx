import {
  SearchResult,
  getSearchResultQuery,
  searchResultValidator
} from '@/app/(site)/[market]/[lang]/search/hooks';
import { getDictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { Grid } from '@/components/base/Grid';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { PageCounter } from '@/components/pages/CollectionPage/PageCounter';
import { PaginationButton } from '@/components/pages/CollectionPage/PaginationButton';
import { Filter } from '@/components/pages/CollectionPage/filter';
import { ProductCard } from '@/components/shared/ProductCard';
import { COLLECTION_PAGE_SIZE, LangValues } from '@/data/constants';
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
}

async function loadSearchResults({ lang, searchQuery, page, tagSlugs }: LoadSearchProps) {
  const sanityQuery = getSearchResultQuery(lang, page);

  return loadQuery<SearchResult | null>(
    sanityQuery,
    { searchQuery: `*${searchQuery}*`, tagSlugs },
    { next: { tags: [`search:${searchQuery}`] } }
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

export default async function Page({ searchParams, params }: Props) {
  const { lang } = params;
  const page = searchParams?.page || '1';
  const searchValue = searchParams?.q || '';
  const currentPage = Number(page) || 1;

  const tagSlugs = formatSearchParams(searchParams);

  const { search_page: dictionary } = await getDictionary();

  const searchResult = await loadSearchResults({
    lang,
    searchQuery: searchValue || '',
    page: currentPage,
    tagSlugs
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

  const resultsText =
    foundProducts && foundProducts?.length > 1 ? dictionary.results : dictionary.result;

  const productIndicesToReceivePriorityProp = [0, 1, 2, 3];

  return (
    <>
      <Filter />
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
        <Section
          label={dictionary.search_results}
          srHeading={dictionary.search_results}
          noTopPadding
        >
          <Container>
            <Grid>
              {foundProducts?.map((product: ProductCardProps, index) => (
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
    </>
  );
}

function formatSearchParams(search: Props['searchParams']) {
  const paramValues = search
    ? Object.entries(search)
        .filter(([key]) => key !== 'q' && key !== 'page')
        .flatMap(([_, value]) => value?.split(',') ?? [])
        .filter((value) => value !== undefined)
    : null;

  if (paramValues?.length === 0) {
    return null;
  }
  return paramValues;
}
