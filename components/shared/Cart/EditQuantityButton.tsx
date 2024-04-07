import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import LoadingDots from '@/components/LoadingDots';
import { removeItem, updateItemQuantity } from '@/components/shared/Cart/actions';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
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

          if (error) {
            // Trigger the error boundary in the root error.js
            throw new Error(error.toString());
          }

          router.refresh();
        });
      }}
      disabled={isPending}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-project px-2 transition-all duration-200 hover:border-brand-border hover:opacity-80',
        {
          'cursor-not-allowed': isPending,
          'ml-auto': type === 'minus'
        }
      )}
    >
      {isPending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}
