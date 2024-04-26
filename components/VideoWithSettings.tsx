import { AspectRatios, VideoSettings } from '@/lib/sanity/types';
import { cn, getAspectRatioString } from '@/lib/utils';
import { getImageProps } from 'next/image';
import { preload } from 'react-dom';

export type VideoProps = {
  playbackId: string;
  loading: 'lazy' | 'eager';
  aspectRatio: string;
  settings: VideoSettings;
  className?: string;
};

export default function VideoWithSettings({
  playbackId,
  loading,
  aspectRatio,
  settings,
  className
}: VideoProps) {
  const { autoPlay } = settings;

  const resolution = null;

  const mp4Url = `https://stream.mux.com/${playbackId}/${
    resolution === 'SD' ? 'medium' : 'high'
  }.mp4`;

  const webmUrl = `https://stream.mux.com/${playbackId}/${
    resolution === 'SD' ? 'medium' : 'high'
  }.webm`;

  // Use `getImgProps` to convert the video poster image to WebP
  const {
    props: { src: poster }
  } = getImageProps({
    src: `https://image.mux.com/${playbackId}/thumbnail.webp?fit_mode=smartcrop&time=0`,
    alt: '',
    fill: true
  });

  // Preload the poster when applicable
  if (loading === 'eager') {
    preload(poster, {
      as: 'image',
      fetchPriority: 'high'
    });
  }

  const playsInline = true;
  const loop = autoPlay ? true : false;
  const controls = autoPlay ? true : false;
  const muted = autoPlay ? true : false;

  return (
    <video
      autoPlay={autoPlay || false}
      playsInline={playsInline}
      loop={loop}
      controls={controls}
      muted={muted}
      poster={poster}
      preload="none"
      className={cn('', getAspectRatioString(aspectRatio as AspectRatios), className)}
    >
      <source src={mp4Url} type="video/mp4" />
      <source src={webmUrl} type="video/webm" />
    </video>
  );
}
