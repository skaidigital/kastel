import { PageLayout } from '@/components/pages/PageLayout';
import { PagePayload, getPageQuery, pageValidator } from '@/components/pages/PageLayout/hooks';
import { MarketValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = await generateStaticSlugs('page');

  return slugs;
}

function loadPage(slug: string, market: MarketValues) {
  const query = getPageQuery(market);

  return loadQuery<PagePayload | null>(query, { slug }, { next: { tags: [`page:${slug}`] } });
}

interface Props {
  params: { slug: string; market: MarketValues };
}

export default async function PageSlugRoute({ params }: Props) {
  const { slug, market } = params;
  const initial = await loadPage(slug, market);

  const pageWithoutNullValues = nullToUndefined(initial.data);
  const validatedPage = pageValidator.safeParse(pageWithoutNullValues);

  if (!validatedPage.success) {
    console.error('Failed to validate page', validatedPage.error);
    return notFound();
  }

  return <PageLayout data={validatedPage.data} market={market} />;
}

export async function generateMetadata({
  params: { slug, market }
}: {
  params: { slug: string; market: MarketValues };
}): Promise<Metadata> {
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
