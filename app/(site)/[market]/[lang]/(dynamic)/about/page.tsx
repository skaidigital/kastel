import { AboutPage } from '@/components/pages/AboutPage';
import { AboutPagePayload, getAboutPageQuery } from '@/components/pages/AboutPage/hooks';
import { removeEmptyPageBuilderObjects } from '@/components/pages/PageLayout/hooks';
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Metadata } from 'next';

function loadAboutPage({ market, lang }: { market: MarketValues; lang: LangValues }) {
  const query = getAboutPageQuery({ market, lang });

  return loadQuery<AboutPagePayload | null>(
    query,
    { slug: 'about' },
    { next: { tags: [CACHE_TAGS.ABOUT_PAGE] } }
  );
}

interface Props {
  params: { slug: string; market: MarketValues; lang: LangValues };
}

export default async function Page({ params: { market, lang } }: Props) {
  const initial = await loadAboutPage({ market, lang });

  const pageWithoutNullValues = nullToUndefined(initial.data);
  const cleanedPageData = removeEmptyPageBuilderObjects(pageWithoutNullValues);

  return <AboutPage data={cleanedPageData} market={market} lang={lang} />;
}

export async function generateMetadata({
  params: { lang }
}: {
  params: { lang: LangValues };
}): Promise<Metadata> {
  const metadata = await loadMetadata({ lang, slug: 'home', schemaType: 'aboutPage' });

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
