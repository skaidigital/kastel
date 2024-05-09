'use client';

import { useCollectionContext } from '@/components/pages/CollectionPage/Context';
import { cn } from '@/lib/utils';

export function ProductsPerRowSelector() {
  // const router = useRouter();

  // const [active, setActive] = useQueryState('view', parseAsInteger);

  // function handleOnClick(number: number) {
  //   setActive(number).then(() => router.refresh());
  // }

  const { productsPerRow, setProductsPerRow } = useCollectionContext();

  function handleOnClick(number: number) {
    setProductsPerRow(number);
  }

  return (
    <div className="flex space-x-2">
      <button onClick={() => handleOnClick(3)}>
        <ViewProductNumber cols={3} active={productsPerRow} />
      </button>
      <button onClick={() => handleOnClick(4)}>
        <ViewProductNumber cols={4} active={productsPerRow} />
      </button>
    </div>
  );
}

function ViewProductNumber({ cols, active }: { cols: 3 | 4; active: number | null }) {
  const validatedActive = active ? Number(active) : 4;

  return (
    <div className="flex space-x-[2px]">
      {Array.from({ length: cols }, (_, index) => (
        <div
          key={index}
          className={cn(
            'h-6 w-4 rounded-sm',
            cols === validatedActive ? 'bg-brand-primary' : 'bg-gray-100'
          )}
        />
      ))}
    </div>
  );
}
