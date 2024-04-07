import { VariantProps, cva } from 'cva';
import { HTMLAttributes } from 'react';

const badgeProps = cva({
  base: 'py-1 px-2 uppercase rounded-project border',
  variants: {
    variant: {
      success: 'bg-[#d1fab3] text-[#217005] border-[#a8f170]',
      warning: 'bg-[#fde473] text-[#9a5800] border-[#fddd00]',
      danger: 'bg-[#fde9ee] text-[#c0123c] border-[#fbd3dc]',
      neutral: 'bg-[#ebeef1] text-[#596171] border-[#d8dee4]'
    },
    size: {
      sm: 'text-eyebrow-sm',
      md: 'text-eyebrow'
    }
  },
  defaultVariants: {
    variant: 'success',
    size: 'md'
  }
});

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeProps> {}

export function Badge({ className, variant, size, children }: BadgeProps) {
  return <span className={badgeProps({ variant, size, className })}>{children}</span>;
}
