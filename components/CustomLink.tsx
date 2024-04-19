'use client';

import { useBaseParams } from '@/lib/hooks/useBaseParams';
import Link from 'next/link';

interface Props extends React.HTMLProps<HTMLAnchorElement> {
  children: React.ReactNode;
}

/**
 * Custom link component that prepends the market and language to the href
 */
export function CustomLink({ href, children, ...restLink }: Props) {
  const { market, lang } = useBaseParams();

  return (
    <Link href={`/${market}/${lang}${href}`} {...restLink}>
      {children}
    </Link>
  );
}
