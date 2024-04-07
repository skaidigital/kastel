import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'cva';
import { HTMLAttributes } from 'react';

const gridProps = cva({
  base: 'grid',
  variants: {
    type: {
      normal: 'grid-cols-2 lg:grid-cols-4'
    },
    spacing: {
      default: 'gap-x-2 md:gap-x-3 lg:gap-x-5 gap-y-5 md:gap-y-10'
    }
  },
  defaultVariants: {
    spacing: 'default',
    type: 'normal'
  }
});

interface GridProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridProps> {}

export const Grid = ({ type, spacing, className, ...props }: GridProps) => {
  return <div className={cn(gridProps({ type, spacing, className }))} {...props} />;
};
