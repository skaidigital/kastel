import Video from '@/components/Video';
import { SanityImage } from '@/components/sanity/SanityImage';
import { MediaProps } from '@/lib/sanity/types';

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
      <SanityImage
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
        <SanityImage
          priority={loading === 'eager' ? true : false}
          image={media.imageMobile}
          className="absolute inset-0 h-full w-full object-cover lg:hidden"
          sizes={sizes}
          fill
        />
        <SanityImage
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
    // return <Video playbackId={media.video} controlled={false} resolution="HD" loading={loading} />;
    return <div>test</div>;
  }

  if (typeIsVideo && !sameAssetForMobileAndDesktop) {
    return (
      <>
        <Video
          playbackId={media.videoMobile}
          controlled={false}
          resolution="HD"
          loading={loading}
          className="lg:hidden"
        />
        <Video
          playbackId={media.videoDesktop}
          controlled={false}
          resolution="HD"
          loading={loading}
          className="hidden lg:block"
        />
      </>
    );
  }

  return null;
}
