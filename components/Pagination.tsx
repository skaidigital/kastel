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
    <div className={cn('text-eyebrow flex space-x-1 uppercase', className)}>
      <Link
        href={hasPreviousPage ? createPageURL(currentPage - 1) : '#'}
        className={cn(
          'text-brand-dark flex h-8 w-8 items-center gap-1 border border-brand-light-grey p-2.5 text-brand-dark-grey',
          !hasPreviousPage && 'cursor-not-allowed opacity-50'
        )}
        aria-disabled={!hasPreviousPage}
      >
        <ChevronLeftIcon className="mt-0.5 h-3 w-3  text-brand-dark-grey" />
      </Link>
      <PageButton pageNumber={currentPage} href="#" isCurrent />
      <Link
        href={hasNextPage ? createPageURL(currentPage + 1) : '#'}
        aria-disabled={!hasNextPage}
        className={cn(
          'flex h-8 w-8 items-center gap-1 border border-brand-light-grey p-2.5  text-brand-dark-grey',
          !hasNextPage && 'cursor-not-allowed opacity-50'
        )}
      >
        <ChevronRightIcon className="mt-0.5 h-3 w-3 text-brand-dark-grey" />
      </Link>
    </div>
  );
}

interface PageButtonProps {
  pageNumber: number;
  href: string;
  isCurrent?: boolean;
}

// function PageButton({ pageNumber, href, isCurrent }: PageButtonProps) {
//   return (
//     <Link
//       href={href}
//       className={cn(
//         'text-eyebrow flex h-8 w-8 items-center justify-center rounded-project border p-2.5 text-center hover:bg-brand-light-grey focus:bg-brand-light-grey',
//         isCurrent ? 'border-brand-light-grey' : 'border-transparent '
//       )}
//     >
//       {pageNumber}
//     </Link>
//   );
// }
function PageButton({ pageNumber, href, isCurrent }: PageButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-project border p-2.5 text-center hover:bg-brand-light-grey focus:bg-brand-light-grey',
        isCurrent ? 'border-brand-light-grey' : 'border-transparent'
      )}
    >
      {pageNumber}
    </Link>
  );
}
