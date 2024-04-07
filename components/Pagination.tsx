'use client';

import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  className?: string;
}

export function Pagination({ hasPreviousPage, hasNextPage, className }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === 1) {
      params.delete('page');
      return `${pathname}?${params.toString()}`;
    }
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className={cn('flex space-x-5 text-eyebrow uppercase', className)}>
      <Link
        href={hasPreviousPage ? createPageURL(currentPage - 1) : '#'}
        className={cn(
          'flex items-center gap-1',
          !hasPreviousPage && 'cursor-not-allowed opacity-50'
        )}
        aria-disabled={!hasPreviousPage}
      >
        <ChevronLeftIcon className="mt-0.5 h-3 w-3" />
        Previous
      </Link>
      <div className="flex">
        {hasPreviousPage && (
          <PageButton pageNumber={currentPage - 1} href={createPageURL(currentPage - 1)} />
        )}
        <PageButton pageNumber={currentPage} href="#" isCurrent />
        {hasNextPage && (
          <PageButton pageNumber={currentPage + 1} href={createPageURL(currentPage + 1)} />
        )}
      </div>
      <Link
        href={hasNextPage ? createPageURL(currentPage + 1) : '#'}
        aria-disabled={!hasNextPage}
        className={cn('flex items-center gap-1', !hasNextPage && 'cursor-not-allowed opacity-50')}
      >
        Next
        <ChevronRightIcon className="mt-0.5 h-3 w-3" />
      </Link>
    </div>
  );
}

interface PageButtonProps {
  pageNumber: number;
  href: string;
  isCurrent?: boolean;
}

function PageButton({ pageNumber, href, isCurrent }: PageButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-project border p-1 text-center text-eyebrow hover:bg-brand-light-grey focus:bg-brand-light-grey',
        isCurrent ? 'border-brand-light-grey' : 'border-transparent '
      )}
    >
      {pageNumber}
    </Link>
  );
}
