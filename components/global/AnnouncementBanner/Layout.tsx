'use client'

import { AnnouncementBannerPayload } from '@/components/global/AnnouncementBanner/hooks'
import { SanityLink } from '@/components/sanity/SanityLink'
import { cn } from '@/lib/utils'
import Marquee from 'react-fast-marquee'

interface Props {
  data: AnnouncementBannerPayload
  className?: string
}

export function AnnouncementBannerLayout(props: Props) {
  const { data: announcementBanner, className } = props

  if (!announcementBanner) return null

  const { isShown } = announcementBanner

  if (!isShown) return null

  const { items } = announcementBanner

  const classNames =
    'flex h-[--announcement-bar-height] w-full items-center justify-center overflow-hidden text-overline-sm font-medium uppercase lg:gap-x-36'

  return (
    <Marquee autoFill pauseOnHover className={className}>
      {items?.map((usp) => {
        if (usp.hasLink) {
          return (
            <SanityLink link={usp.link} key={usp.content} className={cn(classNames)}>
              {usp.content && <span className="mr-10 font-bold lg:mr-32">{usp.content}</span>}
            </SanityLink>
          )
        }
        return (
          <span key={usp.content} className={cn('mr-10 font-bold lg:mr-32', classNames)}>
            {usp.content}
          </span>
        )
      })}
    </Marquee>
  )
}
