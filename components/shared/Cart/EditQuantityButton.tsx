'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { removeItem, updateItemQuantity } from '@/components/shared/Cart/actions';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';

interface Props {
  lineId: string;
  variantId: string;
  quantity: number;
  type: 'plus' | 'minus';
}

export default function EditItemQuantityButton({ lineId, variantId, quantity, type }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  return (
    <button
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      onClick={() => {
        startTransition(async () => {
          const error =
            type === 'minus' && quantity - 1 === 0
              ? await removeItem(lineId)
              : await updateItemQuantity({
                  lineId,
                  variantId,
                  quantity: type === 'plus' ? quantity + 1 : quantity - 1
                });

          console.log({ error });

          if (error) {
            // Trigger the error boundary in the root error.js
            throw new Error(error.toString());
          }
          queryClient.invalidateQueries({
            queryKey: ['cart']
          });

          router.refresh();
        });
      }}
      disabled={isPending}
      className={clsx(
        'ease hover:border-brand-border flex flex-none items-center justify-center rounded-project px-2 transition-all duration-200 hover:opacity-80',
        {
          'cursor-not-allowed': isPending,
          'ml-auto': type === 'minus'
        }
      )}
    >
      {isPending ? (
        <LoadingSpinner />
      ) : type === 'plus' ? (
        <PlusIcon className="size-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="size-4 dark:text-neutral-500" />
      )}
    </button>
  );
}
