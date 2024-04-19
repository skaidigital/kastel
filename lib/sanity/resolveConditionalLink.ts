import { resolveHref } from '@/lib/sanity/resolveHref';
import { ConditionalLinkProps } from '@/lib/sanity/types';

export function resolveConditionalLink(link: ConditionalLinkProps) {
  const href =
    link.hasLink && link.type === 'external'
      ? link.href
      : link.hasLink && link.type === 'internal'
        ? resolveHref({ slug: link.linkTo.slug, type: link.linkTo.type }) || '#'
        : '#';

  return href;
}
