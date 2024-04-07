'use client';

import { Text } from '@/components/base/Text';
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

  if (link) {
    const slug = getSlug(link);

    return (
      <Link
        href={slug || '#'}
        target={link?.linkType === 'external' ? '_blank' : '_self'}
        className="text-brand-dark border-brand-border flex w-full items-center justify-center border-b bg-white p-3 text-center transition-all duration-300 ease-in-out hover:bg-brand-light-grey md:h-11 md:p-0"
      >
        <Text size="eyebrow">{content && content}</Text>
      </Link>
    );
  }

  return (
    <div className="md:p- text-brand-dark border-brand-border relative flex items-center justify-center border-b bg-white p-3 md:h-11">
      <Text size="eyebrow">{content && content}</Text>
    </div>
  );
}
