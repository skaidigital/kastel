import { CollectionPage } from '@/components/pages/CollectionPage';
import {
  CollectionBasePayload,
  CollectionProductPayload,
  CollectionProductsPayload,
  collectionBaseValidator,
  collectionProductsValidator,
  getCollectionBaseQuery,
  getCollectionProductData,
  getProductIdsByOrder,
  mergeCollectionBaseAndProducts
} from '@/components/pages/CollectionPage/hooks';
import { LangValues, MarketValues, URL_STATE_KEYS } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = await generateStaticSlugs('collection');

  return slugs;
}

function loadCollectionBase({
  slug,
  market,
  lang
}: {
  slug: string;
  market: MarketValues;
  lang: LangValues;
}) {
  const query = getCollectionBaseQuery({ market, lang });

  return loadQuery<CollectionBasePayload | null>(
    query,
    { slug },
    { next: { tags: [`collection:${slug}`] } }
  );
}

function loadCollectionProductsOrder(
  slug: string,
  lang: LangValues,
  pageIndex: number,
  tagSlugs: string[] | null,
  sortKey?: string
) {
  const query = getProductIdsByOrder(lang, sortKey);

  return loadQuery<CollectionProductsPayload>(
    query,
    { slug, tagSlugs },
    {
      next: {
        tags: [
          `collection:${slug}`,
          `lang:${lang}+pageIndex:${pageIndex}+tagSlugs:${tagSlugs?.join()}+sortKey:${sortKey || 'default'}`
        ]
      }
    }
  );
}

function loadCollectionProductData(
  market: LangValues,
  productIds: string[],
  pageIndex: number,
  slug: string,
  sortKey?: string
) {
  const query = getCollectionProductData(market, pageIndex);

  return loadQuery<CollectionProductPayload>(
    query,
    { ids: productIds },
    { next: { tags: [`collection:${slug}`, `ids:${productIds?.join()}`, `${sortKey}`] } }
  );
}

interface Props {
  params: { slug: string; market: MarketValues; lang: LangValues };
  searchParams?: {
    page?: string;
    [key: string]: string | undefined;
  };
}

export default async function SlugCollectionPage({ params, searchParams }: Props) {
  const { market, lang, slug } = params;
  const paramValues = formatSearchParamsValues(searchParams);
  const sortKey = searchParams?.sort || 'default';
  const currentPage = Number(searchParams?.page) || 1;
  const isDraftMode = draftMode().isEnabled;

  const initialBase = await loadCollectionBase({ slug, market, lang });
  let validatedBase;

  if (!isDraftMode) {
    const collectionBaseWithoutNullValues = nullToUndefined(initialBase.data);
    validatedBase = collectionBaseValidator.safeParse(collectionBaseWithoutNullValues);

    if (!validatedBase.success) {
      console.error(validatedBase.error);
      notFound();
    }
  }

  const initialProducts = await loadCollectionProductsOrder(
    slug,
    lang,
    currentPage,
    paramValues,
    sortKey
  );

  const productIds = initialProducts.data.products.map((product) => product._id);

  const inititalProductsData = await loadCollectionProductData(
    lang,
    productIds,
    currentPage,
    slug,
    sortKey
  );

  const cleanedProductData = cleanData(initialProducts, inititalProductsData);
  let validatedProducts;

  if (!isDraftMode) {
    validatedProducts = collectionProductsValidator.safeParse({
      products: cleanedProductData,
      hasNextPage: true
    });

    if (!validatedProducts.success) {
      console.error(validatedProducts.error);
      notFound();
    }
  }

  const mergedData = isDraftMode
    ? mergeCollectionBaseAndProducts(initialBase.data, {
        products: cleanedProductData,
        hasNextPage: true
      })
    : mergeCollectionBaseAndProducts(validatedBase?.data, validatedProducts?.data);

  return (
    <CollectionPage
      data={mergedData}
      currentPage={currentPage}
      searchParams={searchParams}
      market={market}
      lang={lang}
    />
  );
}

export async function generateMetadata({
  params: { slug, market }
}: {
  params: { slug: string; market: MarketValues };
}): Promise<Metadata> {
  const metadata = await loadMetadata({
    market,
    slug,
    schemaType: 'collection'
  });

  const title = metadata?.metaTitle;
  const description = metadata?.metaDescription;
  const shouldIndex = !metadata?.noIndex;
  const shouldFollow = !metadata?.noFollow;
  const ogImage = metadata?.ogImage;
  const ogImageUrl = ogImage ? urlForOpenGraphImage(ogImage) : undefined;

  return {
    ...(title && { title }),
    ...(description && { description }),
    ...(ogImageUrl && {
      openGraph: {
        images: [ogImageUrl]
      }
    }),
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow
      }
    }
  };
}

function formatSearchParamsValues(search: Props['searchParams']) {
  const exludeKeys = Object.values(URL_STATE_KEYS);
  const paramValues = search
    ? Object.entries(search)
        .filter(([key]) => !exludeKeys.includes(key))
        .flatMap(([_, value]) => value?.split(',') ?? [])
        .filter((value) => value !== undefined)
    : null;

  if (!paramValues || paramValues?.length === 0 || paramValues[0] === '') {
    return null;
  }
  return paramValues;
}

function cleanData(initialProducts: any, inititalProductsData: any): CollectionProductsPayload {
  const mergedTestData = initialProducts.data.products.map((product: any) => {
    const productData = inititalProductsData.data.find(
      (productData: any) => productData._id === product._id
    );

    return {
      ...product,
      ...productData
    };
  });

  const collectionProductsWithoutNullValues = nullToUndefined({
    products: mergedTestData
  });

  const filteredCollectionProducts = collectionProductsWithoutNullValues.products.filter(
    (product: any) => Object.keys(product).length > 1
  );

  return filteredCollectionProducts;
}
