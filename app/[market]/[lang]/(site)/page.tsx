import { PagePayload, getPageQuery } from '@/components/pages/PageLayout/hooks';
import { MarketValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

const PagePreview = dynamic(() => import('@/components/pages/PageLayout/PagePreview'));

function loadHomePage(market: MarketValues) {
  const query = getPageQuery(market);

  return loadQuery<PagePayload | null>(query, { slug: 'home' }, { next: { tags: ['home'] } });
}

export default async function HomePage({
  params: { market }
}: {
  params: { market: MarketValues };
}) {
  const initial = await loadHomePage(market);

  if (draftMode().isEnabled) {
    return <PagePreview params={{ slug: 'home' }} initial={initial} market={market} />;
  }

  const pageWithoutNullValues = nullToUndefined(initial.data);
  // pageValidator.parse(pageWithoutNullValues);

  // return <PageLayout data={pageWithoutNullValues} market={market} />;
  return <div>Home page</div>;
}

export async function generateMetadata({
  params: { market }
}: {
  params: { market: MarketValues };
}): Promise<Metadata> {
  const metadata = await loadMetadata({ market, slug: 'home', schemaType: 'page' });

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