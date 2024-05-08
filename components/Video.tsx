import { cn } from '@/lib/utils';
import { getImageProps } from 'next/image';
import { preload } from 'react-dom';

export type VideoProps = {
  playbackId: string;
  loading: 'lazy' | 'eager';
  resolution: 'SD' | 'HD';
  controlled?: boolean;
  controls?: boolean;
  className?: string;
};

export default function Video({
  playbackId,
  loading,
  resolution,
  controls,
  className,
  controlled = false
}: VideoProps) {
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

  return (
    <video
      autoPlay={!controlled}
      playsInline={!controlled}
      loop={!controlled}
      controls={controls === true ? true : false}
      muted={!controlled}
      poster={poster}
      preload="none"
      className={cn('absolute h-full w-full overflow-hidden object-cover', className)}
    >
      <source src={mp4Url} type="video/mp4" />
      <source src={webmUrl} type="video/webm" />
    </video>
  );
}
