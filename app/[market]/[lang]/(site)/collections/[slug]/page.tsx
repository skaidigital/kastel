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
import { MarketValues } from '@/data/constants';
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

function loadCollectionBase(slug: string, market: MarketValues) {
  const query = getCollectionBaseQuery(market);

  return loadQuery<CollectionBasePayload | null>(
    query,
    { slug },
    { next: { tags: [`collection:${slug}`] } }
  );
}

function loadCollectionProducts(slug: string, market: MarketValues, pageIndex: number) {
  const query = getCollectionProductsQuery(market, pageIndex);

  return loadQuery<CollectionProductsPayload>(
    query,
    { slug },
    { next: { tags: [`collection:${slug}`] } }
  );
}

interface Props {
  params: { slug: string; market: MarketValues };
  searchParams?: {
    page?: string;
  };
}

export default async function SlugCollectionPage({ params, searchParams }: Props) {
  const { market, slug } = params;

  const currentPage = Number(searchParams?.page) || 1;

  const initialBase = await loadCollectionBase(slug, market);
  const collectionBaseWithoutNullValues = nullToUndefined(initialBase.data);
  const validatedBase = collectionBaseValidator.safeParse(collectionBaseWithoutNullValues);

  if (!validatedBase.success) {
    console.error(validatedBase.error);
    notFound();
  }

  const initialProducts = await loadCollectionProducts(slug, market, currentPage);
  const collectionProductsWithoutNullValues = nullToUndefined(initialProducts.data);
  const validatedProducts = collectionProductsValidator.safeParse(
    collectionProductsWithoutNullValues
  );

  if (!validatedProducts.success) {
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
