import { PagePayload, getPageQuery } from '@/components/pages/PageLayout/hooks';
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

const PagePreview = dynamic(() => import('@/components/pages/PageLayout/PagePreview'));

export async function generateStaticParams() {
  const slugs = await generateStaticSlugs('page');

  return slugs;
}

function loadPage(slug: string, market: MarketValues) {
  const query = getPageQuery(market);

  return loadQuery<PagePayload | null>(query, { slug }, { next: { tags: [`page:${slug}`] } });
}

interface Props {
  params: { slug: string };
}

export default async function PageSlugRoute({ params }: Props) {
  const market = await getMarket();
  const initial = await loadPage(params.slug, market);

  if (draftMode().isEnabled) {
    return <PagePreview params={params} initial={initial} market={market} />;
  }

  const pageWithoutNullValues = nullToUndefined(initial.data);
  // pageValidator.parse(pageWithoutNullValues);

  // return <PageLayout data={pageWithoutNullValues} market={market} />;
  return <div>Page</div>;
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
    schemaType: 'page'
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
