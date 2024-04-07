import { HeroLinkProps } from '@/components/shared/PageBuilder/hooks';
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
};

interface HeroSanityLinkProps {
  link: HeroLinkProps;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

// TODO merge with regular link later
export const SanityLinkHero = ({ link, children, className, onClick }: HeroSanityLinkProps) => {
  if (!link || !link.hasLink) return null;

  // TODO fix this janky ass code
  const formattedLink = {
    ...link,
    type: 'link' as const
  };
  const slug = getSlug(formattedLink);
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
};

//
