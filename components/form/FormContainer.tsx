import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  onSubmit: () => void;
  children: ReactNode;
  className?: string;
}

export function FormContainer({ onSubmit, children, className }: Props) {
  return (
    <form onSubmit={onSubmit} className={cn('w-full space-y-6', className)}>
      {children}
    </form>
  );
}
