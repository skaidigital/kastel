import { getDictionary } from '@/app/dictionaries';
import { ProductPageLayout } from '@/components/pages/ProductPage/ProductPageLayout';
import { Product, getProductQuery, productValidator } from '@/components/pages/ProductPage/hooks';
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { SearchParams } from '@/lib/types';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

// export async function generateStaticParams({
//   params: { lang, market }
// }: {
//   params: { lang: LangValues; market: MarketValues };
// }) {
//   const slugs = await generateStaticSlugsProducts(lang, market);

//   return slugs;
// }

function loadProduct({
  slug,
  market,
  lang,
  gender = 'female'
}: {
  slug: string;
  market: MarketValues;
  lang: LangValues;
  gender?: 'male' | 'female';
}) {
  const query = getProductQuery({ market, lang, gender });

  return loadQuery<Product | null>(
    query,
    { slug },
    { next: { tags: [`${CACHE_TAGS.PRODUCT}${slug}`] } }
  );
}

interface Props {
  params: { slug: string; market: MarketValues; lang: LangValues };
  searchParams?: SearchParams;
}

export default async function SlugProductPage({ params, searchParams }: Props) {
  const slug = params.slug;
  const market = params.market;
  const lang = params.lang;
  const activeGender = cookies().get('gender')?.value as 'male' | 'female' | undefined;

  try {
    const initial = await loadProduct({ slug, market, lang, gender: activeGender });
    const { product_page: dictionary } = await getDictionary();

    if (!initial.data) {
      notFound();
    }

    const productWithoutNullValues = nullToUndefined(initial.data);

    const validatedProduct = productValidator.parse(productWithoutNullValues);

    return (
      <ProductPageLayout
        data={validatedProduct}
        dictionary={dictionary}
        searchParams={searchParams}
        market={market}
        lang={lang}
      />
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export async function generateMetadata({
  params: { slug, market }
}: {
  params: { slug: string; market: MarketValues };
}): Promise<Metadata> {
  const metadata = await loadMetadata({
    market,
    slug,
    schemaType: 'product'
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
