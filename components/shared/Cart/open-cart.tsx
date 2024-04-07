'use client';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <button
      aria-label="Open cart"
      className="relative flex h-11 w-11 items-center justify-center rounded-project text-brand-dark-grey transition-colors hover:bg-brand-light-grey"
    >
      <ShoppingBagIcon className={clsx('transition-brand h-4', className)} />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </button>
  );
}
