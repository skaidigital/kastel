import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'cva';
import React from 'react';

export const headingStyles = cva({
  base: '',
  variants: {
    size: {
      xs: 'text-heading-xs uppercase font-bold',
      sm: 'text-heading-sm uppercase font-bold',
      md: 'text-heading-md uppercase font-bold',
      lg: 'text-heading-lg uppercase font-bold',
      'lg-nature-lab':
        'text-nature-lab-heading-lg lg:text-nature-lab-heading-xl font-[--nature-lab-heading]',
      xl: 'text-heading-lg xl:text-heading-xl uppercase font-bold'
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
