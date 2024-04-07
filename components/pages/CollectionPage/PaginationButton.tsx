'use client';

import { buttonProps } from '@/components/Button';
import { cn, createPageURL } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  type: 'previous' | 'next';
  className?: string;
}

export function PaginationButton({ children, type, className }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  if (type === 'previous' && currentPage === 1) {
    return null;
  }

  const href = createPageURL({
    pageNumber: type === 'previous' ? currentPage - 1 : currentPage + 1,
    searchParams,
    pathname
  });

  return (
    <Link href={href} className={cn('', buttonProps({ variant: 'secondary' }), className)}>
      {children}
    </Link>
  );
}
