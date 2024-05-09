import { LoadingSpinner } from '@/components/LoadingSpinner';
import { removeItem } from '@/components/shared/Cart/actions';
import { TrashSimple } from '@phosphor-icons/react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useTransition } from 'react';

interface Props {
  itemId: string;
}

export default function RemoveFromCartButton({ itemId }: Props) {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  return (
    <button
      aria-label="Remove cart item"
      onClick={() => {
        startTransition(async () => {
          const error = await removeItem(itemId);

          if (error) {
            // Trigger the error boundary in the root error.js
            throw new Error(error.toString());
          }
          queryClient.invalidateQueries({
            queryKey: ['cart']
          });
        });
      }}
      disabled={isPending}
      className={clsx(
        'ease flex h-[17px] w-[17px] items-center justify-center rounded-project text-brand-dark-grey transition-all duration-200',
        {
          'cursor-not-allowed px-0': isPending
        }
      )}
    >
      {isPending ? <LoadingSpinner className="size-4" /> : <TrashSimple className="size-4" />}
    </button>
  );
}
