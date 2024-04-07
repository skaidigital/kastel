import { SanityImage } from '@/components/sanity/SanityImage';
import { MobileCarousel } from '@/components/shared/MobileCarousel';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@sanity/react-loader';
import { ConfiguratorContainer } from '../ConfiguratorContainer';
import { ConfiguratorMediaContainer } from '../ConfiguratorMediaContainer';
import { getConfiguratorImagesQueryV2, getConfiguratorProductImagesQuery } from '../hooks';
import { ActiveImage } from './ActiveImage';
import { ArrowButtons } from './ArrowButtons';
import { ImageThumbnails } from './ImageThumbnails';

function loadConfiguratorImages(step: string, market: MarketValues) {
  const query = getConfiguratorImagesQueryV2(step, market);

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

interface Props {
  params?: { [key: string]: string | string[] | undefined };
}

export async function GallerySection({ params }: Props) {
  const step = params?.step || '0';
  const isOnLastStep = step === '4';
  const market = await getMarket();

  const initial = await loadConfiguratorImages(String(step), market);
  const cleanedData = nullToUndefined(initial.data.step);

  const stepSlug: string = cleanedData?.slug;
  const stepImages = cleanedData?.products.map((image: any) => image.images);

  const hasImages = stepImages?.length > 0;

  return (
    <ConfiguratorContainer>
      <ConfiguratorMediaContainer>
        {!isOnLastStep && (
          <>
            <ActiveImage stepSlug={stepSlug} stepProducts={initial.data.step.products} />
            {hasImages && (
              <ArrowButtons stepSlug={stepSlug} stepProducts={initial.data.step.products} />
            )}
            {hasImages && (
              <div className="absolute bottom-0 left-0 w-full">
                <ImageThumbnails stepSlug={stepSlug} stepProducts={initial.data.step.products} />
              </div>
            )}
          </>
        )}
        {isOnLastStep && <FinalStep params={params} />}
      </ConfiguratorMediaContainer>
    </ConfiguratorContainer>
  );
}
interface FinalStepProps {
  params?: { [key: string]: string | string[] | undefined };
}

async function FinalStep({ params }: FinalStepProps) {
  const market = await getMarket();
  const slugs: string[] = [];
  if (params && typeof params === 'object') {
    for (const [key, value] of Object.entries(params)) {
      if (key !== 'step' && key !== 'variants' && typeof value === 'string') {
        slugs.push(value);
      }
    }
  }

  const images = await loadConfiguratorActiveImages(slugs, market);

  if (!images) {
    return null;
  }

  const imageArray = images.data.map((product: any) => product.gallery);

  return (
    <>
      <div className="hidden h-full w-full grid-cols-2 lg:grid">
        {images.data.map((product: any) => (
          <div className="relative h-full w-full" key={product.gallery.asset._ref}>
            <SanityImage image={product.gallery} fill className="absolute" />
          </div>
        ))}
      </div>
      <MobileCarousel images={imageArray} />
    </>
  );
}
