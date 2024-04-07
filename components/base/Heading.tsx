import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'cva';
import React from 'react';

export const headingStyles = cva({
  base: 'uppercase',
  variants: {
    size: {
      xs: 'text-[12px] leading-[24px] tracking-[2.4px]',
      sm: 'text-[12px] leading-[24px] tracking-[2.4px] md:text-[16px] md:leading-[24px] md:tracking-[3.2px]',
      md: 'text-[16px]  md:text-[24px] tracking-[4px] leading-[28px] ',
      lg: 'text-[24px] leading-[28px]  md:text-[32px] tracking-[4px] lg:leading-[36px]'
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
  return <Component className={cn(headingStyles({ size }), className)}>{children}</Component>;
};
