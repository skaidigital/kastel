import { ROUTES } from '@/data/constants';
import { LinkProps, LinkWithoutTextProps } from '@/lib/sanity/types';

export const getSlug = (link: LinkProps | LinkWithoutTextProps) => {
  const linkType = link.linkType;

  if (linkType === 'external') {
    return link.href || '#';
  }

  if (linkType === 'smile') {
    return '#';
  }

  if (!link.linkTo) {
    return '#';
  }

  const internalLinkType = link.linkTo.type;
  const slug = link.linkTo.slug;

  if (internalLinkType === 'page' && slug === 'home') {
    return `/`;
  }

  switch (internalLinkType) {
    case 'page':
      return `/${slug}`;
    case 'product':
      return `${ROUTES.PRODUCTS}/${slug}`;
    case 'collection':
      return `${ROUTES.COLLECTIONS}/${slug}`;
    case 'retailersPage':
      return `/stores`;
    case 'blogLandingPage':
      return `${ROUTES.BLOG}`;
    case 'blogPost':
      return `${ROUTES.BLOG}/${slug}`;
    case 'helpCenter':
      return `${ROUTES.HELP_CENTER}`;
    case 'legalPage':
      return `${ROUTES.LEGAL}/${slug}`;
    default:
      return '/';
  }
};
