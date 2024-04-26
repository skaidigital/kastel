import { urlForImage } from '@/lib/sanity/image';
import { SanityImageProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { getImageDimensions } from '@sanity/asset-utils';
import Image from 'next/image';

interface Props {
  image: SanityImageProps;
  className?: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const SanityImage = ({ image, className, sizes, fill, priority, width, height }: Props) => {
  if (!image?.asset?._ref) return null;

  const altText = image.altText || '';
  const dimensions = getImageDimensions(image);

  const widthProp = width ?? dimensions.width;
  const heightProp = height ?? dimensions.height;

  return (
    <>
      {image?.asset && (
        <Image
          fetchPriority={priority ? 'high' : 'auto'}
          priority={priority}
          src={urlForImage(image).url()}
          alt={altText}
          width={!fill ? widthProp : undefined}
          height={!fill ? heightProp : undefined}
          placeholder="blur"
          blurDataURL={image.asset.metadata.lqip}
          className={cn('', fill && 'object-cover', className)}
          sizes={sizes ?? '(max-width: 768px) 100vw,(max-width: 1200px) 50vw,40vw'}
          fill={fill}
        />
      )}
    </>
  );
};
