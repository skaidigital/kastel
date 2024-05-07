import { getDictionary } from '@/app/dictionaries';
import { CollectionPage } from '@/components/pages/CollectionPage';
import { loadCollectionProductDataV2 } from '@/components/pages/CollectionPage/actions';
import {
  CollectionBasePayload,
  collectionBaseValidator,
  getCollectionBaseQuery
} from '@/components/pages/CollectionPage/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/storeServer';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export async function generateStaticParams({ params: { lang } }: { params: { lang: LangValues } }) {
  const slugs = await generateStaticSlugs(lang, 'collection');

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

interface Props {
  params: { slug: string; market: MarketValues; lang: LangValues };
}

export default async function SlugCollectionPage({ params }: Props) {
  const { market, lang, slug } = params;
  const paramValues = null;
  const sortKey = undefined;
  const queryClient = new QueryClient();

  const initialBase = await loadCollectionBase({ slug, market, lang });
  const collectionBaseWithoutNullValues = nullToUndefined(initialBase.data);
  const validatedBase = collectionBaseValidator.safeParse(collectionBaseWithoutNullValues);
  const { collection_page } = await getDictionary({ lang });

  if (!validatedBase.success) {
    console.error(validatedBase.error);
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ['collectionProducts', slug, lang],
    queryFn: () =>
      loadCollectionProductDataV2({ lang, market, slug, currentPage: 1, sortKey, paramValues })
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CollectionPage
          validatedBase={validatedBase.data}
          slug={slug}
          market={market}
          lang={lang}
          dictionary={collection_page}
        />
      </HydrationBoundary>
    </>
  );
}

export async function generateMetadata({
  params: { slug, lang }
}: {
  params: { slug: string; lang: LangValues };
}): Promise<Metadata> {
  const metadata = await loadMetadata({
    lang,
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
