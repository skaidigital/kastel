'use client';

import { ROUTES } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProductCardContext } from './shared/ProductCard/Context';

interface Props extends React.HTMLProps<HTMLAnchorElement> {
  children: React.ReactNode;
  noScroll?: boolean;
}

/**
 * Custom link component that prepends the market and language to the href
 */
export function CustomLink({ href, children, noScroll, ...restLink }: Props) {
  const { market, lang } = useBaseParams();
  const router = useRouter();

  if (!href || !children) return null;

  const conditionalPrefetch = () => {
    if (href) {
      router.prefetch(`/${market}/${lang}${href}`);
    }
  };

  return (
    <Link
      href={`/${market}/${lang}${href}`}
      {...restLink}
      prefetch={false}
      scroll={noScroll ? false : undefined}
      onMouseEnter={(e) => {
        conditionalPrefetch();
        return restLink.onMouseEnter?.(e);
      }}
      onPointerEnter={(e) => {
        conditionalPrefetch();
        return restLink.onPointerEnter?.(e);
      }}
      onTouchStart={(e) => {
        conditionalPrefetch();
        return restLink.onTouchStart?.(e);
      }}
      onFocus={(e) => {
        conditionalPrefetch();
        return restLink.onFocus?.(e);
      }}
    >
      {children}
    </Link>
  );
}

interface ProductCardProps extends React.HTMLProps<HTMLAnchorElement> {
  children: React.ReactNode;
  slug: string;
}

export function CustomLinkProductCard({ slug, children, ...restLink }: ProductCardProps) {
  const router = useRouter();
  const { activeColorway } = useProductCardContext();

  const { market, lang } = useBaseParams();

  if (!slug || !children) return null;

  const activeSlug = activeColorway?.slug || slug;
  const href = `${ROUTES.PRODUCTS}/${activeSlug}`;

  const conditionalPrefetch = () => {
    if (href) {
      void router.prefetch(`/${market}/${lang}${href}`);
    }
  };

  return (
    <Link
      href={`/${market}/${lang}${href}`}
      {...restLink}
      prefetch={false}
      onMouseEnter={(e) => {
        conditionalPrefetch();
        return restLink.onMouseEnter?.(e);
      }}
      onPointerEnter={(e) => {
        conditionalPrefetch();
        return restLink.onPointerEnter?.(e);
      }}
      onTouchStart={(e) => {
        conditionalPrefetch();
        return restLink.onTouchStart?.(e);
      }}
      onFocus={(e) => {
        conditionalPrefetch();
        return restLink.onFocus?.(e);
      }}
    >
      {children}
    </Link>
  );
}
