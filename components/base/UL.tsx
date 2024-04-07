import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  level?: number;
}

export const UL = ({ children, className, level = 1 }: Props) => {
  return <ul className={cn('list-disc', level === 1 && 'pb-3 md:pb-5', className)}>{children}</ul>;
};
