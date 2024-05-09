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
  onClick?: () => void;
}

export const SanityLink = ({ link, children, className, onClick }: Props) => {
  if (!link) return null;

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
        // onClick={async () => {
        //   if (window.SmileUI) {
        //     await window.SmileUI.openPanel({
        //       deep_link: 'home'
        //     }).catch((error: any) => {
        //       console.error('Failed to open smile link', error);
        //     });

        //     window.SmileUI.ready().then(() =>
        //       window.SmileUI.openPanel({ deep_link: deeplinkType }).catch((error: any) => {
        //         console.error('Failed to open smile link', error);
        //       })
        //     );
        //   } else {
        //     console.error('Failed to open smile link');
        //   }
        // }}
        onClick={async () => {
          if (window.SmileUI) {
            await window.SmileUI.openPanel({ deep_link: deeplinkType });
            // onClick?.();
          } else {
            console.warn('SmileUI is not loaded and initialized.');
            // onClick?.();
          }
        }}
      >
        {children}
      </button>
    );
  }

  return null;
};
