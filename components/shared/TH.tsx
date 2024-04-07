import { textProps } from '@/components/base/Text';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function TH({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        `whitespace-nowrap p-2 text-left font-normal uppercase ${textProps({ size: 'eyebrow' })}`,
        className
      )}
    >
      {children}
    </th>
  );
}
