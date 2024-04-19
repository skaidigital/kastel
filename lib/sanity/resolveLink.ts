import { resolveHref } from '@/lib/sanity/resolveHref';
import { LinkProps } from '@/lib/sanity/types';

export function resolveLink(link: LinkProps) {
  const href =
    link.linkType === 'external'
      ? link.href
      : resolveHref({ slug: link.linkTo.slug, type: link.linkTo.type }) || '#';

  return href;
}
