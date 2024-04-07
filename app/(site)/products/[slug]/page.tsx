import { getDictionary } from '@/app/dictionaries';
import { Product, getProductQuery } from '@/components/pages/ProductPage/hooks';
import { CACHE_TAGS, MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { generateStaticSlugsProducts } from '@/lib/sanity/loader/generateStaticSlugs';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { SearchParams } from '@/lib/types';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

const ProductPreview = dynamic(() => import('components/pages/ProductPage/ProductPreview'));

export async function generateStaticParams() {
  const slugs = await generateStaticSlugsProducts();

  return slugs;
}

function loadProduct(slug: string, market: MarketValues) {
  const query = getProductQuery(market);

  return loadQuery<Product | null>(
    query,
    { slug },
    { next: { tags: [`${CACHE_TAGS.PRODUCT}${slug}`] } }
  );
}

interface Props {
  params: { slug: string };
  searchParams?: SearchParams;
}

export default async function SlugProductPage({ params, searchParams }: Props) {
  const slug = params.slug;
  const market = await getMarket();
  const initial = await loadProduct(slug, market);
  const { product_page: dictionary } = await getDictionary();

  if (draftMode().isEnabled) {
    return (
      <ProductPreview
        params={params}
        initial={initial}
        market={market}
        dictionary={dictionary}
        searchParams={searchParams}
      />
    );
  }

  if (!initial.data) {
    notFound();
  }

  const productWithoutNullValues = nullToUndefined(initial.data);

  // const validatedProduct = productValidator.parse(productWithoutNullValues);

  // return (
  //   <ProductPageLayout
  //     data={validatedProduct}
  //     dictionary={dictionary}
  //     searchParams={searchParams}
  //   />
  // );
  return <div>Product</div>;
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
