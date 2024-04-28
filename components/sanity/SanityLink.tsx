import { getSlug } from '@/lib/sanity/getSlug';
import { LinkProps } from '@/lib/sanity/types';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  link: LinkProps;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SanityLink = ({ link, children, className, onClick }: Props) => {
  if (!link) return null;

  if (link.linkType === 'external' || link.linkType === 'internal') {
    const slug = getSlug(link);
    const openInNewTab = link.linkType === 'external' && link.openInNewTab === true;

    return (
      <Link
        className={className || ''}
        href={slug || '#'}
        target={openInNewTab ? '_blank' : '_self'}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  const deeplinkType = link.smileLauncher;

  return (
    <button
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
};
