import { textProps } from '@/components/base/Text';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function TD({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <td
      className={cn(
        `py-4 pl-2 pr-8 text-brand-mid-grey ${textProps({
          size: 'sm'
        })}`,
        className
      )}
    >
      {children}
    </td>
  );
}
