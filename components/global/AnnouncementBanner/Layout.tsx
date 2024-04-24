'use client';

import { CustomLink } from '@/components/CustomLink';
import { AnnouncementBannerPayload } from '@/components/global/AnnouncementBanner/hooks';
import { resolveLink } from '@/lib/sanity/resolveLink';
import Marquee from 'react-fast-marquee';

interface Props {
  data: AnnouncementBannerPayload;
}

export function AnnouncementBannerLayout(props: Props) {
  const { data: announcementBanner } = props;

  if (!announcementBanner) return null;

  const { isShown } = announcementBanner;

  if (!isShown) return null;

  const { content, hasLink } = announcementBanner;

  const Wrapper = hasLink ? CustomLink : 'div';

  return (
    <Wrapper
      href={hasLink ? resolveLink(announcementBanner.link) : undefined}
      className="flex h-8 w-full items-center justify-center overflow-hidden bg-brand-primary text-overline-sm font-medium uppercase text-white lg:gap-x-36"
    >
      <Marquee autoFill pauseOnHover>
        {content?.map((usp) => {
          return (
            <span key={usp && usp} className="mr-10 lg:mr-32">
              {usp && usp}
            </span>
          );
        })}
      </Marquee>
    </Wrapper>
  );
}
