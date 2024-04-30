'use client';

import { CustomLink } from '@/components/CustomLink';
import { getSlug } from '@/lib/sanity/getSlug';
import { LinkProps } from '@/lib/sanity/types';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  link: LinkProps;
  children: ReactNode;
  className?: string;
}

export const SanityLink = ({ link, children, className }: Props) => {
  if (!link) return null;

  if (link.linkType === 'internal') {
    const slug = getSlug(link);

    return (
      <CustomLink className={className || ''} href={slug || '#'}>
        {children}
      </CustomLink>
    );
  }

  if (link.linkType === 'external') {
    return (
      <Link
        className={className || ''}
        href={link.href}
        target={link.openInNewTab ? '_blank' : '_self'}
      >
        {children}
      </Link>
    );
  }

  if (link.linkType === 'smile') {
    const deeplinkType = link.smileLauncher;

    return (
      <button
        className={className || ''}
        onClick={() => {
          if (window.SmileUI) {
            window.SmileUI.openPanel({ deep_link: deeplinkType });
          } else {
            console.log('SmileUI is not loaded and initialized.');
          }
        }}
      >
        {children}
      </button>
    );
  }

  return null;
};
