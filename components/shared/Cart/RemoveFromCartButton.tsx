import { useRouter } from 'next/navigation';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { removeItem } from '@/components/shared/Cart/actions';
import { TrashSimple } from '@phosphor-icons/react';
import clsx from 'clsx';
import { useTransition } from 'react';

interface Props {
  itemId: string;
}

export default function RemoveFromCartButton({ itemId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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

          router.refresh();
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
      {isPending ? <LoadingSpinner className="size-2" /> : <TrashSimple className="h-4 w-4" />}
    </button>
  );
}
