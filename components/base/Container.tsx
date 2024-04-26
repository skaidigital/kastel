import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'cva';
import { HTMLAttributes } from 'react';

const container = cva({
  base: 'px-4 lg:px-8 w-full mx-auto',
  variants: {
    size: {
      sm: 'max-w-[500px]',
      md: 'max-w-[750px]',
      lg: 'max-w-[1540px]'
    }
  },

  defaultVariants: {
    // size: 'lg'
  }
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof container> {}

export const Container = ({ size, className, ...props }: ContainerProps) => {
  return <div className={cn(container({ size, className }))} {...props} />;
};
