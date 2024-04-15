import Video from '@/components/Video';
import { SanityImage } from '@/components/sanity/SanityImage';
import { MediaProps } from '@/lib/sanity/types';

interface Props {
  media: MediaProps;
  loading: 'lazy' | 'eager';
}

export function Media({ media, loading }: Props) {
  const { type, sameAssetForMobileAndDesktop } = media;
  const typeIsImage = type === 'image';
  const typeIsVideo = type === 'video';

  if (typeIsImage && sameAssetForMobileAndDesktop) {
    return (
      <SanityImage
        priority={loading === 'eager'}
        image={media.image}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        sizes="100vw"
        fill
      />
    );
  }

  if (typeIsImage && !sameAssetForMobileAndDesktop) {
    return (
      <>
        <SanityImage
          priority={loading === 'eager'}
          image={media.imageMobile}
          className="absolute inset-0 -z-10 h-full w-full object-cover lg:hidden"
          sizes="100vw"
          fill
        />
        <SanityImage
          priority={loading === 'eager'}
          image={media.imageDesktop}
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover lg:block"
          sizes="100vw"
          fill
        />
      </>
    );
  }

  if (typeIsVideo && sameAssetForMobileAndDesktop) {
    return (
      <Video
        playbackId={media.video}
        resolution="HD"
        loading={loading}
        className="-z-10 lg:hidden"
      />
    );
  }

  if (typeIsVideo && !sameAssetForMobileAndDesktop) {
    return (
      <>
        <Video
          playbackId={media.videoMobile}
          resolution="HD"
          loading={loading}
          className="-z-10 lg:hidden"
        />
        <Video
          playbackId={media.videoDesktop}
          resolution="HD"
          loading={loading}
          className="inset-0 -z-10 hidden lg:block"
        />
      </>
    );
  }

  return null;
}
