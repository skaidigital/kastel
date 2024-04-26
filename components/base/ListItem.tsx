import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  level?: number;
  className?: string;
}

export const ListItem = ({ children, level = 1, className }: Props) => {
  return (
    <li
      className={cn(
        `list-inside pt-3 text-sm md:text-md lg:list-outside lg:text-lg`,
        level === 1 && 'ml-3 md:ml-5',
        level === 2 && 'ml-5 md:ml-7',
        level === 3 && 'ml-7 md:ml-10',
        className
      )}
    >
      {children}
    </li>
  );
};
