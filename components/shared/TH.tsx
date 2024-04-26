import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function TH({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th className={cn('whitespace-nowrap p-2 px-6 py-3 text-left text-xs', className)}>
      {children}
    </th>
  );
}
