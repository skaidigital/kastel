'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { applyDiscountCode } from '@/components/shared/Cart/DiscountCodeInput/actions';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface Props {
  className?: string;
}

export function DiscountCodeInput({ className }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <form className={cn('flex w-full gap-x-1', className)}>
      <input
        placeholder="Discount code"
        className="flex grow items-center justify-center rounded-[2px] border border-brand-light-grey bg-brand-sand px-4 py-3 text-xs text-brand-mid-grey placeholder:text-xs"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          // Safeguard in case someone messes with `disabled` in devtools.
          startTransition(async () => {
            const response = await applyDiscountCode();
            if (response.success) {
              toast.success('Discount code applied');
              return;
            }
            if (!response.success) {
              toast.error('Invalid discount code');
            }

            // router.refresh();
          });
        }}
        className="flex min-w-[72px] items-center justify-center rounded-[2px] border border-brand-light-grey bg-brand-sand px-4 py-3 text-xs text-brand-mid-grey"
      >
        {isPending ? <LoadingSpinner /> : 'Apply'}
      </button>
    </form>
  );
}
