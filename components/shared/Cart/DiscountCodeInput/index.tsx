'use client';

import { Badge } from '@/components/Badge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { addDiscount } from '@/components/shared/Cart/DiscountCodeInput/actions';
import { Cart } from '@/lib/shopify/types';
import { PlusIcon } from '@radix-ui/react-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface Props {
  // discountCodes?: { code: string }[];
  discountCodes?: Cart['discountCodes'];
  className?: string;
}

// TODO fix it crashing when adding another
export function DiscountCodeInput({ discountCodes, className }: Props) {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const hasDiscountCodes = discountCodes && discountCodes.length > 0;

  return (
    <div className={className}>
      {!isShown && (
        <button
          onClick={() => {
            setIsShown(true);
          }}
          className="flex w-full items-center justify-between bg-white"
        >
          <span className="text-xs">Discount code</span>
          <PlusIcon className="size-4" />
        </button>
      )}
      {isShown && (
        <form className={'flex w-full flex-col focus-within:mb-[120px] lg:focus-within:mb-0'}>
          <div className="flex gap-x-1">
            <input
              ref={inputRef}
              placeholder="Discount code"
              className="flex grow items-center justify-center rounded-[2px] border border-brand-light-grey bg-brand-sand px-4 py-2 text-[16px] text-brand-mid-grey placeholder:text-xs"
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
                    if (inputRef.current) {
                      inputRef.current.value = '';
                    }
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
        </form>
      )}
      {hasDiscountCodes && (
        <div className="mt-2 flex gap-x-1">
          {discountCodes.map((item) => (
            <Badge size="xs" key={item.code}>
              Code: {item.code}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
