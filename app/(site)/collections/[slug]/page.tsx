import { CollectionPage } from '@/components/pages/CollectionPage';
import {
  CollectionBasePayload,
  CollectionProductsPayload,
  collectionValidator,
  getCollectionBaseQuery,
  getCollectionProductsQuery,
  mergeCollectionBaseAndProducts
} from '@/components/pages/CollectionPage/hooks';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

const CollectionPreview = dynamic(
  () => import('components/pages/CollectionPage/CollectionPreview')
);

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
  params: { slug: string };
  searchParams?: {
    page?: string;
  };
}

export default async function SlugCollectionPage({ params, searchParams }: Props) {
  const market = await getMarket();

  const currentPage = Number(searchParams?.page) || 1;

  const initialBase = await loadCollectionBase(params.slug, market);
  const initialProducts = await loadCollectionProducts(params.slug, market, currentPage);

  const collectionBaseWithoutNullValues = nullToUndefined(initialBase.data);
  const collectionProductsWithoutNullValues = nullToUndefined(initialProducts.data);

  const mergedData = mergeCollectionBaseAndProducts(
    collectionBaseWithoutNullValues,
    collectionProductsWithoutNullValues
  );

  if (draftMode().isEnabled) {
    return (
      <CollectionPreview
        params={params}
        initialBase={initialBase}
        intialProducts={initialProducts}
        market={market}
        currentPage={currentPage}
      />
    );
  }

  if (!initialBase.data) {
    notFound();
  }

  const validatedData = collectionValidator.parse(mergedData);

  return <CollectionPage data={validatedData} currentPage={currentPage} />;
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;

  const market = await getMarket();

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
