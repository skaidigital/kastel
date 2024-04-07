'use server';

import {
  getConfiguratorImagesQuery,
  getConfiguratorProductImagesQuery
} from '@/components/pages/ConfiguratorPage/hooks';
import { SanityImage } from '@/components/sanity/SanityImage';
import { MobileCarousel } from '@/components/shared/MobileCarousel';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';

interface Props {
  params?: { [key: string]: string | string[] | undefined };
}

function loadConfiguratorImages(step: string, market: MarketValues) {
  const query = getConfiguratorImagesQuery(step, market);

  return loadQuery<any>(query, {}, { next: { tags: [`configuratorImages:${step}`] } });
}

function loadConfiguratorActiveImages(slugsArray: string[], market: MarketValues) {
  if (slugsArray.length === 0) {
    return { data: [] };
  }
  const query = getConfiguratorProductImagesQuery(market);

  return loadQuery<any>(
    query,
    { slugs: slugsArray },
    { next: { tags: [`configuratorProductImages:${slugsArray.join(',')}`] } }
  );
}

export async function ConfiguratorImages({ params }: Props) {
  const step = params?.step || '0';
  const activeProductSlugs = params;
  // get market
  const market = await getMarket();

  const slugsArray: string[] = [];
  if (activeProductSlugs && typeof activeProductSlugs === 'object') {
    for (const [key, value] of Object.entries(activeProductSlugs)) {
      if (key !== 'step' && key !== 'variants' && typeof value === 'string') {
        slugsArray.push(value);
      }
    }
  }

  const activeProductImageResponse = await loadConfiguratorActiveImages(slugsArray, market);
  const initial = await loadConfiguratorImages(String(step), market);

  const activeImages = activeProductImageResponse.data
    .sort((a: any, b: any) => {
      return slugsArray.indexOf(a.slug) - slugsArray.indexOf(b.slug);
    })
    .map((product: any) => product.gallery);

  const activeImagesLength = activeImages.length || 0;
  const stepImages = initial.data.images;

  const slicedStepImages = stepImages.slice(activeImagesLength);
  const compositeGallery = [...(activeImages || []), ...(slicedStepImages || [])];

  // return null;
  return (
    compositeGallery &&
    compositeGallery.map((image: any) => (
      <div key={image._ref} className="aspect-h-4 aspect-w-3 relative h-full w-full">
        <SanityImage
          image={image}
          sizes={image.width === '2-COL' ? '1000px' : '600px'}
          className="absolute h-auto w-full object-cover"
          fill
        />
      </div>
    ))
  );
}

export async function ConfiguratorImagesMobile({ params }: Props) {
  const step = params?.step || '0';
  const activeProductSlugs = params;
  // get market
  const market = await getMarket();

  const slugsArray: string[] = [];
  if (activeProductSlugs && typeof activeProductSlugs === 'object') {
    for (const [key, value] of Object.entries(activeProductSlugs)) {
      if (key !== 'step' && key !== 'variants' && typeof value === 'string') {
        slugsArray.push(value);
      }
    }
  }

  const activeProductImageResponse = await loadConfiguratorActiveImages(slugsArray, market);
  const initial = await loadConfiguratorImages(String(step), market);

  const activeImages = activeProductImageResponse.data
    .sort((a: any, b: any) => {
      return slugsArray.indexOf(a.slug) - slugsArray.indexOf(b.slug);
    })
    .map((product: any) => product.gallery);

  const activeImagesLength = activeImages.length || 0;
  const stepImages = initial.data.images;

  const slicedStepImages = stepImages.slice(activeImagesLength);
  const compositeGallery = [...(activeImages || []), ...(slicedStepImages || [])];

  return <MobileCarousel images={compositeGallery} />;
}
