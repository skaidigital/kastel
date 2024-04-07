'use client';

import { buttonProps } from '@/components/Button';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  reccommenedMarketUrl: string;
}

export function RedirectButton({ children, reccommenedMarketUrl }: Props) {
  return (
    <Link href={reccommenedMarketUrl} className={buttonProps()}>
      {children}
    </Link>
  );
}
