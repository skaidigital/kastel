'use client';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/Carousel';
import { Section } from '@/components/base/Section';
import { UGCSectionProps } from '@/components/shared/PageBuilder/hooks';
import { cn } from '@/lib/utils';
import { getImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import { preload } from 'react-dom';

interface PropsWithExtra extends UGCSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const UGCSection = ({ data }: Props) => {
  const { index, pageId, pageType, videos, sectionSettings } = data;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Section
      label="ugcSection"
      srHeading="UGC videos"
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
    >
      <div className="hidden grid-cols-3 gap-x-1 lg:grid">
        {videos?.map((video, index) => (
          <div key={video + index} className="aspect-h-16 aspect-w-9 relative h-0 w-full">
            {/* <Video playbackId={video} /> */}
            <div>test</div>
          </div>
        ))}
      </div>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start'
        }}
        className="lg:hidden"
      >
        <CarouselContent className="-ml-2">
          {videos?.map((video, index) => (
            <CarouselItem key={video + index} className="basis-[80%] pl-2">
              <div className="aspect-h-16 aspect-w-9 relative h-0 w-full">
                {/* <Video playbackId={video} /> */}
                <div>test</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <ScrollDots current={current} count={count} className="mt-10" />
      </Carousel>
    </Section>
  );
};

function ScrollDots({
  current,
  count,
  className
}: {
  current: number;
  count: number;
  className?: string;
}) {
  return (
    <div className={cn('flex w-full justify-center gap-2', className)}>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={cn('h-2 max-w-20 grow', {
            'bg-brand-primary': current === index + 1,
            'bg-brand-light-grey': current !== index + 1
          })}
        />
      ))}
    </div>
  );
}

interface VideoProps {
  playbackId: string;
  className?: string;
}

function Video({ playbackId, className }: VideoProps) {
  let resolution;
  let loading;

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
      autoPlay={true}
      playsInline={true}
      loop={true}
      controls={true}
      muted={true}
      poster={poster}
      preload="none"
      className={cn('absolute h-full w-full overflow-hidden object-cover', className)}
    >
      <source src={mp4Url} type="video/mp4" />
      <source src={webmUrl} type="video/webm" />
    </video>
  );
}
