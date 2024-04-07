'use client';

import Video, { VideoProps } from '@/components/Video';
import Image, { getImageProps } from 'next/image';
import { preload } from 'react-dom';
import { useInView } from 'react-intersection-observer';

export function LazyLoadedVideo(props: VideoProps) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '100px' });

  const {
    props: { src: poster }
  } = getImageProps({
    src: `https://image.mux.com/${props.playbackId}/thumbnail.webp?fit_mode=smartcrop&time=0`,
    alt: '',
    fill: true
  });

  // Preload the poster when applicable
  if (props.loading === 'eager') {
    preload(poster, {
      as: 'image',
      fetchPriority: 'high'
    });
  }

  return (
    <>
      {!inView ? (
        <Image ref={ref} alt={'Video poster'} src={poster ?? ''} loading="lazy" fill />
      ) : (
        <Video {...props} />
      )}
    </>
  );
}
