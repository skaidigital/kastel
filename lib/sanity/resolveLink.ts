import { resolveHref } from '@/lib/sanity/resolveHref';
import { LinkProps, LinkWithoutTextProps } from '@/lib/sanity/types';

export function resolveLink(link: LinkProps | LinkWithoutTextProps) {
  // const href =
  //   link.linkType === 'external'
  //     ? link.href
  //     : resolveHref({ slug: link.linkTo.slug, type: link.linkTo.type }) || '#';

  switch (link.linkType) {
    case 'internal':
      return resolveHref({ slug: link.linkTo.slug, type: link.linkTo.type });
    case 'external':
      return link.href;
    case 'smile':
      return `#`;
    default:
      return '#';
  }
  // return href;
}
