'use client';

import { CustomLink } from '@/components/CustomLink';
import { getSlugConditionalLink } from '@/lib/sanity/getSlug';
import { ConditionalLinkProps } from '@/lib/sanity/types';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  link: ConditionalLinkProps;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ConditionalSanityLink = ({ link, children, className, onClick }: Props) => {
  if (!link || !link.hasLink) return null;

  if (link.type === 'internal') {
    const slug = getSlugConditionalLink(link);

    return (
      <CustomLink onClick={onClick} className={className || ''} href={slug || '#'}>
        {children}
      </CustomLink>
    );
  }

  if (link.type === 'external') {
    return (
      <Link
        className={className || ''}
        onClick={onClick}
        href={link.href}
        target={link.openInNewTab ? '_blank' : '_self'}
      >
        {children}
      </Link>
    );
  }

  if (link.type === 'smile') {
    const deeplinkType = link.smileLauncher;

    return (
      <button
        className={className || ''}
        onClick={() => {
          if (window.SmileUI) {
            window.SmileUI.openPanel({ deep_link: deeplinkType });
            onClick && onClick();
          } else {
            console.warn('SmileUI is not loaded and initialized.');
            onClick && onClick();
          }
        }}
      >
        {children}
      </button>
    );
  }

  return null;
};
