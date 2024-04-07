import { getDictionary } from '@/app/dictionaries';
import { cleanedProductData, getBundleQuery } from '@/components/pages/ProductPage/hooks';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

function loadBundle(slug: string, market: MarketValues) {
  const query = getBundleQuery(market);

  return loadQuery<any | null>(query, { slug }, { next: { tags: [`bundle:${slug}:${market}`] } });
}

interface Props {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function SlugProductPage({ params, searchParams }: Props) {
  const slug = params.slug;
  const market = await getMarket();

  const initialBundle = await loadBundle(slug, market);

  const { product_page: dictionary } = await getDictionary();

  const productWithoutNullValues = nullToUndefined(initialBundle.data);

  const cleanedProduct = cleanedProductData(productWithoutNullValues);

  if (!initialBundle.data) {
    notFound();
  }

  // return <BundlePage data={cleanedProduct} dictionary={dictionary} params={searchParams} />;
  return <div>Bundle</div>;
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
    schemaType: 'bundle'
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
