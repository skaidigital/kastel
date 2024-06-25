'use client'

import Video, { VideoProps } from '@/components/Video'
import { cn } from '@/lib/utils'
import Image, { getImageProps } from 'next/image'
import { preload } from 'react-dom'
import { useInView } from 'react-intersection-observer'

export default function LazyLoadedVideo(props: VideoProps) {
  const { ref, inView } = useInView({ triggerOnce: true })

  // Use `getImgProps` to convert the video poster image to WebP
  const {
    props: { src: poster }
  } = getImageProps({
    src: `https://image.mux.com/${props.playbackId}/thumbnail.webp?fit_mode=smartcrop&time=0`,
    alt: '',
    fill: true
  })

  // Preload the poster when applicable
  if (props.loading === 'eager') {
    preload(poster, {
      as: 'image',
      fetchPriority: 'high'
    })
  }

  return (
    <>
      {!inView ? (
        <Image
          ref={ref}
          alt={'Video poster'}
          src={poster ?? ''}
          className={cn(props.className)}
          fill
          loading={'lazy'}
          sizes="(max-width: 768px) 80vw, 33vw"
        />
      ) : (
        <Video {...props} />
      )}
    </>
  )
}
