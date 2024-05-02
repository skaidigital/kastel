import { ROUTES } from '@/data/constants';
import { ConditionalLinkProps, LinkProps, LinkWithoutTextProps } from '@/lib/sanity/types';

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

  if (internalLinkType === 'page' && link.linkTo.slug === 'home') {
    return `/`;
  }

  switch (internalLinkType) {
    case 'page':
      return `/${link.linkTo.slug}`;
    case 'product':
      return `${ROUTES.PRODUCTS}/${link.linkTo.slug}`;
    case 'collection':
      return `${ROUTES.COLLECTIONS}/${link.linkTo.slug}`;
    case 'retailersPage':
      return `/stores`;
    case 'blogLandingPage':
      return `${ROUTES.BLOG}`;
    case 'blogPost':
      return `${ROUTES.BLOG}/${link.linkTo.slug}`;
    case 'helpCenter':
      return `${ROUTES.HELP_CENTER}`;
    case 'legalPage':
      return `${ROUTES.LEGAL}/${link.linkTo.slug}`;
    default:
      return '/';
  }
};

export const getSlugConditionalLink = (link: ConditionalLinkProps) => {
  if (!link.hasLink) return '#';

  const linkType = link.type;

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

  if (internalLinkType === 'page' && link.linkTo.slug === 'home') {
    return `/`;
  }

  switch (internalLinkType) {
    case 'page':
      return `/${link.linkTo.slug}`;
    case 'product':
      return `${ROUTES.PRODUCTS}/${link.linkTo.slug}`;
    case 'collection':
      return `${ROUTES.COLLECTIONS}/${link.linkTo.slug}`;
    case 'retailersPage':
      return `/stores`;
    case 'blogLandingPage':
      return `${ROUTES.BLOG}`;
    case 'blogPost':
      return `${ROUTES.BLOG}/${link.linkTo.slug}`;
    case 'helpCenter':
      return `${ROUTES.HELP_CENTER}`;
    case 'legalPage':
      return `${ROUTES.LEGAL}/${link.linkTo.slug}`;
    default:
      return '/';
  }
};
