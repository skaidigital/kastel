import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  level?: number;
}

export const OL = ({ children, className, level = 1 }: Props) => {
  return (
    <ol className={cn('list-decimal', level === 1 && 'pb-3 md:pb-5', className)}>{children}</ol>
  );
};
