import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'cva';
import React from 'react';

export const headingStyles = cva({
  base: 'uppercase font-bold',
  variants: {
    size: {
      xs: 'text-heading-xs',
      sm: 'text-heading-sm',
      md: 'text-heading-md',
      lg: 'text-heading-lg',
      xl: 'text-heading-lg xl:text-heading-xl'
    }
  },
  defaultVariants: {
    size: 'lg'
  }
});

interface HeadingProps extends VariantProps<typeof headingStyles> {
  children: React.ReactNode | null;
  as?: React.ElementType;
  className?: string;
}

export const Heading = ({ size, as: Component = 'h1', children, className }: HeadingProps) => {
  return <Component className={cn(headingStyles({ size, className }))}>{children}</Component>;
};
