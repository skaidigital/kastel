'use client';

import { Text } from '@/components/base/Text';
import { InfoBannerPayload } from '@/components/global/InfoBanner/hooks';
import { getSlug } from '@/lib/sanity/getSlug';
import Link from 'next/link';

interface Props {
  data: InfoBannerPayload;
  // encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function InfoBannerLayout(props: Props) {
  const {
    data: infoBanner
    // encodeDataAttribute
  } = props;

  if (!infoBanner) return null;

  const { isShown } = infoBanner;

  if (!isShown) return null;

  const { content, link } = infoBanner;

  if (link) {
    const slug = getSlug(link);

    return (
      <Link
        href={slug || '#'}
        target={link?.linkType === 'external' ? '_blank' : '_self'}
        className="text-brand-dark flex w-full items-center justify-center border-b border-brand-border bg-white p-3 text-center transition-all duration-300 ease-in-out hover:bg-brand-light-grey md:h-11 md:p-0"
      >
        <Text size="eyebrow">{content && content}</Text>
      </Link>
    );
  }

  return (
    <div className="md:p- text-brand-dark relative flex items-center justify-center border-b border-brand-border bg-white p-3 md:h-11">
      <Text size="eyebrow">{content && content}</Text>
    </div>
  );
}
