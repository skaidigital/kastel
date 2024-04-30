'use client';

import { AnnouncementBannerPayload } from '@/components/global/AnnouncementBanner/hooks';
import { SanityLink } from '@/components/sanity/SanityLink';
import Marquee from 'react-fast-marquee';

interface Props {
  data: AnnouncementBannerPayload;
  className?: string;
}

export function AnnouncementBannerLayout(props: Props) {
  const { data: announcementBanner } = props;

  if (!announcementBanner) return null;

  const { isShown } = announcementBanner;

  if (!isShown) return null;

  const { content, hasLink } = announcementBanner;

  const classNames =
    'flex h-[--announcement-bar-height] w-full items-center justify-center overflow-hidden bg-brand-primary text-overline-sm font-medium uppercase text-white lg:gap-x-36';

  if (hasLink) {
    return (
      <SanityLink link={announcementBanner.link} className={classNames}>
        <Marquee autoFill pauseOnHover>
          {content?.map((usp) => {
            return (
              <span key={usp && usp} className="mr-10 font-bold lg:mr-32">
                {usp && usp}
              </span>
            );
          })}
        </Marquee>
      </SanityLink>
    );
  }

  return (
    <div className={classNames}>
      <Marquee autoFill pauseOnHover>
        {content?.map((usp) => {
          return (
            <span key={usp && usp} className="mr-10 font-bold lg:mr-32">
              {usp && usp}
            </span>
          );
        })}
      </Marquee>
    </div>
  );
}
