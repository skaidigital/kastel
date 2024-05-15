'use client';

import { CustomLink } from '@/components/CustomLink';
import { getSlug } from '@/lib/sanity/getSlug';
import { LinkProps, LinkWithoutTextProps } from '@/lib/sanity/types';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  link: LinkProps | LinkWithoutTextProps;
  children: ReactNode;
  className?: string;
  onClick?: (e: any) => void;
}

export const SanityLink = ({ link, children, className, onClick }: Props) => {
  if (!link) return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  if (link.linkType === 'internal') {
    const slug = getSlug(link);

    return (
      <CustomLink onClick={onClick} className={className || ''} href={slug || '#'}>
        {children}
      </CustomLink>
    );
  }

  if (link.linkType === 'external') {
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

  if (link.linkType === 'smile') {
    const deeplinkType = link.smileLauncher;

    return (
      <button
        className={className || ''}
        onClick={async (e) => {
          if (window.SmileUI) {
            await window.SmileUI.openPanel({ deep_link: deeplinkType });
            handleClick(e);
          } else {
            console.warn('SmileUI is not loaded and initialized.');
            handleClick(e);
          }
        }}
      >
        {children}
      </button>
    );
  }

  return null;
};
