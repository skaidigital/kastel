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
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const SanityLink = ({ link, children, className, onClick }: Props) => {
  if (!link) return null;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Call the provided onClick handler if available
    if (onClick) {
      onClick(event);
    }

    if (link.linkType === 'smile' && window.SmileUI) {
      event.preventDefault(); // Prevent default link behavior
      window.SmileUI.openPanel({ deep_link: link.smileLauncher }).catch(() => {
        console.warn('SmileUI is not loaded and initialized.');
      });
    }
  };

  if (link.linkType === 'internal') {
    const slug = getSlug(link);
    return (
      <CustomLink onClick={handleClick} className={className || ''} href={slug || '#'}>
        {children}
      </CustomLink>
    );
  }

  if (link.linkType === 'external') {
    return (
      <Link
        className={className || ''}
        onClick={handleClick}
        href={link.href}
        target={link.openInNewTab ? '_blank' : '_self'}
      >
        {children}
      </Link>
    );
  }

  // Handle other link types like 'smile'
  if (link.linkType === 'smile') {
    return (
      <button className={className || ''} onClick={handleClick}>
        {children}
      </button>
    );
  }

  return null;
};
