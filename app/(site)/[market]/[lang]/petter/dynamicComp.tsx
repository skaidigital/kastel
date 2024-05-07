import {
  CollectionProductPayload,
  CollectionProductsPayload,
  getCollectionProductData,
  getProductIdsByOrder
} from '@/components/pages/CollectionPage/hooks';
import { COLLECTION_PAGE_SIZE, LangValues, MarketValues } from '@/data/constants';
import { loadQuery } from '@/lib/sanity/store';

function loadCollectionProductsOrder(
  slug: string,
  lang: LangValues,
  tagSlugs: string[] | null,
  sortKey?: string
) {
  const query = getProductIdsByOrder(lang, sortKey);

  return loadQuery<CollectionProductsPayload>(query, { slug, tagSlugs });
}

function loadCollectionProductData(
  lang: LangValues,
  market: MarketValues,
  productIds: string[],
  pageIndex: number,
  slug: string,
  sortKey?: string
) {
  const query = getCollectionProductData(lang, market);

  return loadQuery<CollectionProductPayload[]>(
    query,
    { ids: productIds },
    { next: { tags: [`collection:${slug}`, `pageIndex:${pageIndex}`, `${sortKey}`] } }
  );
}

interface Props {
  page: string;
}

export default async function DynamicComp({ page }: Props) {
  const slug = 'varsko';
  const lang = 'no';
  const market = 'no';
  const tagSlugs = null;
  const currentPage = Number(page);

  const initialProducts = await loadCollectionProductsOrder(slug, lang, tagSlugs, 'default');

  const removeInvalidProducts = initialProducts.data.products.filter((product) => product._id);
  const currentStart = (currentPage - 1) * COLLECTION_PAGE_SIZE;
  const currentEnd = currentPage * COLLECTION_PAGE_SIZE;
  const paginatedInitialProducts = removeInvalidProducts.slice(currentStart, currentEnd);
  const paginatedProductIds = paginatedInitialProducts.map((product) => product._id);

  const inititalProductsData = await loadCollectionProductData(
    lang,
    market,
    paginatedProductIds,
    currentPage,
    slug
  );
  return (
    <>
      <p>DynamicComp</p>
      {inititalProductsData.data.map((product) => {
        return <p key={product._id}>{product.title}</p>;
      })}
    </>
  );
}
