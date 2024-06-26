import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';
import * as React from 'react';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { cn } from '@/lib/utils';

export const buttonProps = cva({
  base: 'inline-flex duration-100 ease items-center justify-center whitespace-nowrap font-bold uppercase ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      primary:
        'bg-brand-primary text-white hover:bg-brand-primary-light hover:text-brand-primary focus:bg-brand-primary-light focus:text-brand-primary',
      secondary:
        'bg-white text-brand-dark-grey hover:bg-brand-primary hover:text-white focus:bg-brand-primary focus:text-white',
      outline:
        'border border-brand-light-grey text-white hover:bg-brand-primary-light focus:bg-white hover:text-brand-dark-grey focus:text-brand-dark-grey',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
      default: 'px-6 py-4 text-[14px] leading-[14px] lg:text-[24px] lg:leading-[24px]',
      sm: 'text-[14px] leading-[14px] tracking-wide h-12 px-6',
      md: 'px-6 py-4 text-[24px] leading-[40px]',
      lg: 'text-[32px] py-8 px-14 leading-[32px]',
      icon: 'size-10',
      'icon-lg': 'p-4'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonProps> {
  asChild?: boolean;
  isLoading?: boolean;
}

// TODO fix loading state
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonProps({ variant, size, className }))} ref={ref} {...props}>
        {isLoading ? <LoadingSpinner /> : props.children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonProps as buttonVariants };

{
  /* {props.children ? 'Loading...' : props.children} */
}
{
  /* </Comp> */
}
