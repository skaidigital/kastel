import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  level?: number;
  className?: string;
  fontColor?: string;
}

export const ListItem = ({ children, level = 1, fontColor, className }: Props) => {
  return (
    <li
      className={cn(
        `md:text-paragraph-md list-inside pt-3 text-paragraph-sm lg:list-outside lg:text-paragraph-lg`,
        fontColor ?? 'text-primary',
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
