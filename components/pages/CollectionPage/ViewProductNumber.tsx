'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';

export function ViewProductNumberLayout() {
  const router = useRouter();

  const [active, setActive] = useQueryState('view', parseAsInteger);

  function handleOnClick(number: number) {
    setActive(number).then(() => router.refresh());
    // router.refresh();
  }

  return (
    <div className="flex space-x-2">
      <button onClick={() => handleOnClick(3)}>
        <ViewProductNumber cols={3} active={active} />
      </button>
      <button onClick={() => handleOnClick(4)}>
        <ViewProductNumber cols={4} active={active} />
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
        ></div>
      ))}
    </div>
  );
}

// function ViewProductNumber({ cols, active }: { cols: 3 | 4; active: number | null }) {
//   const validatedActive = active ? Number(active) : 4;

//   return (
//     <div className="flex space-x-[2px]">
//       <div
//         className={cn(
//           'h-6 w-4 rounded-sm',
//           cols === validatedActive ? 'bg-brand-primary' : 'bg-gray-100'
//         )}
//       ></div>
//       <div
//         className={cn(
//           'h-6 w-4 rounded-sm',
//           cols === validatedActive ? 'bg-brand-primary' : 'bg-gray-100'
//         )}
//       ></div>
//       <div
//         className={cn(
//           'h-6 w-4 rounded-sm',
//           cols === validatedActive ? 'bg-brand-primary' : 'bg-gray-100'
//         )}
//       ></div>
//       {cols === 4 && (
//         <div
//           className={cn(
//             'h-6 w-4 rounded-sm',
//             cols === validatedActive ? 'bg-brand-primary' : 'bg-gray-100'
//           )}
//         ></div>
//       )}
//     </div>
//   );
// }
