import { MediaProps } from '@/lib/sanity/types';
import dynamic from 'next/dynamic';

const DynamicSanityImage = dynamic(() =>
  import('@/components/sanity/SanityImage').then((mod) => mod.SanityImage)
);
const DynamicVideo = dynamic(() => import('@/components/Video').then((mod) => mod.default));
const DynamicLazyLoadedVideo = dynamic(() =>
  import('@/components/LazyLoadedVideo').then((mod) => mod.default)
);

interface Props {
  media: MediaProps;
  loading: 'lazy' | 'eager';
  sizes?: string;
}

export function Media({ media, loading, sizes }: Props) {
  const { type, sameAssetForMobileAndDesktop } = media;
  const typeIsImage = type === 'image';
  const typeIsVideo = type === 'video';

  if (typeIsImage && sameAssetForMobileAndDesktop) {
    return (
      <DynamicSanityImage
        priority={loading === 'eager' ? true : false}
        image={media.image}
        className="absolute inset-0 h-full w-full object-cover"
        sizes={sizes}
        fill
      />
    );
  }

  if (typeIsImage && !sameAssetForMobileAndDesktop) {
    return (
      <>
        <DynamicSanityImage
          priority={loading === 'eager' ? true : false}
          image={media.imageMobile}
          className="absolute inset-0 h-full w-full object-cover lg:hidden"
          sizes={sizes}
          fill
        />
        <DynamicSanityImage
          priority={loading === 'eager' ? true : false}
          image={media.imageDesktop}
          className="absolute inset-0 hidden h-full w-full object-cover lg:block"
          sizes={sizes}
          fill
        />
      </>
    );
  }

  if (typeIsVideo && sameAssetForMobileAndDesktop) {
    if (loading === 'lazy') {
      return (
        <DynamicLazyLoadedVideo
          playbackId={media.video}
          controlled={false}
          resolution="HD"
          loading="lazy"
        />
      );
    }
    return (
      <DynamicVideo playbackId={media.video} controlled={false} resolution="HD" loading="eager" />
    );
  }

  if (typeIsVideo && !sameAssetForMobileAndDesktop) {
    if (loading === 'lazy') {
      <>
        <DynamicLazyLoadedVideo
          playbackId={media.videoMobile}
          controlled={false}
          resolution="HD"
          loading="lazy"
          className="lg:hidden"
        />
        <DynamicLazyLoadedVideo
          playbackId={media.videoDesktop}
          controlled={false}
          resolution="HD"
          loading="lazy"
          className="hidden lg:block"
        />
      </>;
    }
    return (
      <>
        <DynamicVideo
          playbackId={media.videoMobile}
          controlled={false}
          resolution="HD"
          loading="lazy"
          className="lg:hidden"
        />
        <DynamicVideo
          playbackId={media.videoDesktop}
          controlled={false}
          resolution="HD"
          loading="lazy"
          className="hidden lg:block"
        />
      </>
    );
  }

  return null;
}
