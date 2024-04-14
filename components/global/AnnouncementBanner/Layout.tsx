'use client';

import { AnnouncementBannerPayload } from '@/components/global/AnnouncementBanner/hooks';
import { getSlug } from '@/lib/sanity/getSlug';
import Link from 'next/link';

interface Props {
  data: AnnouncementBannerPayload;
}

export function AnnouncementBannerLayout(props: Props) {
  const { data: announcementBanner } = props;

  if (!announcementBanner) return null;

  const { isShown } = announcementBanner;

  if (!isShown) return null;

  const { content, link } = announcementBanner;
  const slug = getSlug(link);

  return (
    <Link
      href={slug || '#'}
      target={link?.linkType === 'external' ? '_blank' : '_self'}
      className="flex h-8 w-full items-center justify-center gap-x-10 overflow-hidden bg-brand-primary text-overline-md font-medium uppercase text-white lg:gap-x-36"
    >
      {content &&
        content.map((item, index) => (
          <span className="whitespace-nowrap" key={item + index}>
            {item}
          </span>
        ))}
    </Link>
  );
}
