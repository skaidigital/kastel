'use client';

import LoadingDots from '@/components/LoadingDots';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const buttonProps = cva({
  base: 'uppercase font-bold',
  variants: {
    variant: {
      primary: 'bg-brand-primary text-white',
      secondary:
        'bg-transparent text-brand-dark-grey border border-brand-border hover:border-brand-mid-grey focus:ring-brand-dark-grey',
      ghost:
        'bg-transparent text-brand-dark-grey hover:bg-black/10 border border-transparent focus:ring-brand-light-grey',
      outline:
        'bg-transparent text-brand-dark-grey hover:bg-black/10 border border-brand-dark-grey',
      icon: 'border-0 p-1 flex items-center justify-center text-gray-600 hover:bg-black/[5%] pressed:bg-black/10 dark:text-zinc-400 dark:hover:bg-white/10 dark:pressed:bg-white/20 disabled:bg-transparent'
    },
    size: {
      sm: 'py-4 px-6 text-text-sm',
      default: 'px-8 h-11',
      icon: 'h-11 w-11'
    },
    fullWidth: {
      true: 'w-full'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
    fullWidth: false
  }
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonProps> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading, fullWidth, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonProps({ variant, size, fullWidth, className }),
          'relative',
          isLoading && 'bg-brand-mid-grey hover:bg-brand-mid-grey'
        )}
        ref={ref}
        aria-disabled={isLoading}
        disabled={isLoading}
        {...props}
      >
        <>
          {isLoading ? (
            <LoadingDots size={size === 'icon' ? 'sm' : 'md'} className="bg-white" />
          ) : (
            children
          )}
        </>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonProps };
