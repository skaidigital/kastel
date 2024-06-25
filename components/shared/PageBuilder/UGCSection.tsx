'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/Carousel'
import LazyLoadedVideo from '@/components/LazyLoadedVideo'
import { Section } from '@/components/base/Section'
import { UGCSectionProps } from '@/components/shared/PageBuilder/hooks'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface PropsWithExtra extends UGCSectionProps {
  index: number
  pageId: string
  pageType: string
}

interface Props {
  data: PropsWithExtra
}

export const UGCSection = ({ data }: Props) => {
  const { videos, sectionSettings } = data

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  function setActive(index: number) {
    if (!api) {
      return
    }

    api.scrollTo(index)
  }

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
            <LazyLoadedVideo playbackId={video} loading="lazy" resolution="HD" controls />
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
                <LazyLoadedVideo playbackId={video} loading="lazy" resolution="HD" controls />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <ScrollDots current={current} count={count} onClick={setActive} className="mt-10" />
      </Carousel>
    </Section>
  )
}

function ScrollDots({
  current,
  count,
  onClick,
  className
}: {
  current: number
  count: number
  onClick: (index: number) => void
  className?: string
}) {
  return (
    <div className={cn('flex w-full justify-center gap-2', className)}>
      {Array.from({ length: count }, (_, index) => (
        <button
          aria-label={`${index + 1}`}
          onClick={() => onClick(index)}
          key={index}
          className={cn('h-2 max-w-20 grow', {
            'bg-brand-primary': current === index + 1,
            'bg-brand-light-grey': current !== index + 1
          })}
        />
      ))}
    </div>
  )
}
