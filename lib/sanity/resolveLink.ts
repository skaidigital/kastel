import { resolveHref } from '@/lib/sanity/resolveHref';
import { LinkProps, LinkWithoutTextProps } from '@/lib/sanity/types';

export function resolveLink(link: LinkProps | LinkWithoutTextProps) {
  const href =
    link.linkType === 'external'
      ? link.href
      : resolveHref({ slug: link.linkTo.slug, type: link.linkTo.type }) || '#';

  return href;
}
