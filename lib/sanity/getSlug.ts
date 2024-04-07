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
  if (internalLinkType === 'page') {
    return `/${slug}`;
  } else if (internalLinkType === 'product') {
    return `/products/${slug}`;
  } else if (internalLinkType === 'collection') {
    return `/collections/${slug}`;
  } else if (internalLinkType === 'storeLocator') {
    return `/stores`;
  } else if (internalLinkType === 'configurator') {
    return `/configurator`;
  } else {
    return '/';
  }
};
