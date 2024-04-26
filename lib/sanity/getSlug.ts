import { SCHEMA_NAMES } from '@/data/constants';
import { LinkProps, LinkWithoutTextProps } from '@/lib/sanity/types';

export const getSlug = (link: LinkProps | LinkWithoutTextProps) => {
  const linkType = link.linkType;

  if (linkType === 'external') {
    return link.href || '#';
  }

  if (!link.linkTo) {
    return '#';
  }

  const internalLinkType = link.linkTo.type;
  const slug = link.linkTo.slug;

  if (internalLinkType === 'page' && slug === 'home') {
    return `/`;
  }
  if (internalLinkType === SCHEMA_NAMES.PAGE) {
    return `/${slug}`;
  } else if (internalLinkType === 'product') {
    return `/${SCHEMA_NAMES.PRODUCT}/${slug}`;
  } else if (internalLinkType === 'collection') {
    return `/${SCHEMA_NAMES.COLLECTION}/${slug}`;
  } else if (internalLinkType === 'retailersPage') {
    return `/stores`;
  } else {
    return '/';
  }
};
