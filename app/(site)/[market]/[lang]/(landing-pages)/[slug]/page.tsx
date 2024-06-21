import { DynamicPage } from '@/components/pages/DynamicPage';
import {
  PagePayload,
  getPageQuery,
  removeEmptyPageBuilderObjects
} from '@/components/pages/DynamicPage/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export async function generateStaticParams({ params: { lang } }: { params: { lang: LangValues } }) {
  const slugs = await generateStaticSlugs(lang, 'page');

  return slugs;
}

function loadPage({
  slug,
  market,
  lang
}: {
  slug: string;
  market: MarketValues;
  lang: LangValues;
}) {
  const query = getPageQuery({ market, lang });

  return loadQuery<PagePayload | null>(query, { slug }, { next: { tags: [`page:${slug}`] } });
}

interface Props {
  params: { slug: string; market: MarketValues; lang: LangValues };
}

export default async function PageSlugRoute({ params }: Props) {
  const { slug, market, lang } = params;
  const initial = await loadPage({ slug, market, lang });

  if (!initial.data) {
    return notFound();
  }

  const pageWithoutNullValues = nullToUndefined(initial.data);
  const cleanedPageData = removeEmptyPageBuilderObjects(pageWithoutNullValues);

  // const validatedPage = pageValidator.safeParse(cleanedPageData);

  // if (!validatedPage.success) {
  //   console.error('Failed to validate page', validatedPage.error);
  //   return notFound();
  // }

  return <DynamicPage data={cleanedPageData} market={market} lang={lang} />;
}

export async function generateMetadata({
  params: { slug, lang }
}: {
  params: { slug: string; lang: LangValues };
}): Promise<Metadata> {
  const metadata = await loadMetadata({
    lang,
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
