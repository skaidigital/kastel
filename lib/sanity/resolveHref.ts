import { PageTypes } from '@/lib/sanity/types';

interface Props {
  slug: string;
  type: PageTypes;
}

export function resolveHref({ slug, type }: Props) {
  if (slug === 'home') {
    return '/';
  }
  switch (type) {
    case 'page':
      return slug ? `/${slug}` : undefined;
    case 'product':
      return slug ? `/products/${slug}` : undefined;
    case 'collection':
      return slug ? `/collections/${slug}` : undefined;
    default:
      console.warn('Invalid document type:', type);
      return undefined;
  }
}
