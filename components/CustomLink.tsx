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

  if (!href || !children) return null;

  return (
    <Link href={`/${market}/${lang}${href}`} {...restLink} scroll={noScroll ? false : undefined}>
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

  return (
    <Link
      href={`/${market}/${lang}${href}`}
      {...restLink}
      onMouseEnter={() => {
        router.prefetch(`/${market}/${lang}${href}`);
      }}
    >
      {children}
    </Link>
  );
}
