import { CollectionPage } from '@/components/pages/CollectionPage';
import {
  CollectionBasePayload,
  CollectionProductsPayload,
  collectionBaseValidator,
  collectionProductsValidator,
  getCollectionBaseQuery,
  getCollectionProductsQuery,
  mergeCollectionBaseAndProducts
} from '@/components/pages/CollectionPage/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = await generateStaticSlugs('collection');

  return slugs;
}

function loadCollectionBase(slug: string, lang: LangValues) {
  const query = getCollectionBaseQuery(lang);

  return loadQuery<CollectionBasePayload | null>(
    query,
    { slug },
    { next: { tags: [`collection:${slug}`] } }
  );
}

function loadCollectionProducts(
  slug: string,
  lang: LangValues,
  pageIndex: number,
  tagSlugs: string[] | null
) {
  const query = getCollectionProductsQuery(lang, pageIndex);

  return loadQuery<CollectionProductsPayload>(
    query,
    { slug, tagSlugs },
    { next: { tags: [`collection:${slug}`, `tags:${tagSlugs?.join()}`] } }
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
  const paramValues = formatSearchParams(searchParams);

  const currentPage = Number(searchParams?.page) || 1;

  const initialBase = await loadCollectionBase(slug, lang);
  const collectionBaseWithoutNullValues = nullToUndefined(initialBase.data);
  const validatedBase = collectionBaseValidator.safeParse(collectionBaseWithoutNullValues);

  if (!validatedBase.success) {
    console.error(validatedBase.error);
    notFound();
  }

  const initialProducts = await loadCollectionProducts(
    slug,
    lang,
    currentPage,
    paramValues as string[] | null
  );

  const collectionProductsWithoutNullValues = nullToUndefined(initialProducts.data);

  const filteredCollectionProducts = collectionProductsWithoutNullValues.products.filter(
    (product: any) => Object.keys(product).length > 1
  );

  const validatedProducts = collectionProductsValidator.safeParse({
    products: filteredCollectionProducts,
    hasNextPage: collectionProductsWithoutNullValues.hasNextPage
  });

  if (!validatedProducts.success) {
    console.log('Error Thrown here');

    console.error(validatedProducts.error);
    notFound();
  }

  const mergedData = mergeCollectionBaseAndProducts(
    collectionBaseWithoutNullValues,
    collectionProductsWithoutNullValues
  );

  if (!initialBase.data) {
    notFound();
  }

  return <CollectionPage data={mergedData} currentPage={currentPage} />;
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

function formatSearchParams(search: Props['searchParams']) {
  const paramValues = search
    ? Object.entries(search)
        .filter(([key]) => key !== 'page')
        .flatMap(([_, value]) => value?.split(',') ?? [])
        .filter((value) => value !== undefined)
    : null;

  if (paramValues?.length === 0) {
    return null;
  }
  return paramValues;
}
