'use client';

import { Badge } from '@/components/Badge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { addDiscount } from '@/components/shared/Cart/DiscountCodeInput/actions';
import { Cart } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useTransition } from 'react';
import { toast } from 'sonner';

interface Props {
  // discountCodes?: { code: string }[];
  discountCodes?: Cart['discountCodes'];
  className?: string;
}

// TODO fix it crashing when adding another
export function DiscountCodeInput({ discountCodes, className }: Props) {
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <form className={cn('flex w-full flex-col', className)}>
      <div className="flex gap-x-1">
        <input
          ref={inputRef}
          placeholder="Discount code"
          className="flex grow items-center justify-center rounded-[2px] border border-brand-light-grey bg-brand-sand px-4 py-3 text-xs text-brand-mid-grey placeholder:text-xs"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            // Safeguard in case someone messes with `disabled` in devtools.
            startTransition(async () => {
              const inputVal = inputRef.current?.value;
              if (!inputVal) return;

              const response = await addDiscount(inputVal);

              if (response.success) {
                toast.success('Discount code applied');
                queryClient.invalidateQueries({
                  queryKey: ['cart']
                });
                return;
              }
              if (!response.success) {
                toast.error('Invalid discount code');
              }
            });
          }}
          className="flex min-w-[72px] items-center justify-center rounded-[2px] border border-brand-light-grey bg-brand-sand px-4 py-3 text-xs text-brand-mid-grey"
        >
          {isPending ? <LoadingSpinner /> : 'Apply'}
        </button>
      </div>
      {discountCodes && discountCodes.length > 0 && (
        <div className="mt-2 flex gap-x-1">
          {discountCodes.map((item) => (
            <Badge size="xs" key={item.code}>
              Code: {item.code}
            </Badge>
          ))}
        </div>
      )}
    </form>
  );
}
