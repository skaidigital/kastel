import { VariantProps, cva } from 'cva'
import { HTMLAttributes } from 'react'

const badgeProps = cva({
  base: 'rounded-[4px] w-fit',
  variants: {
    variant: {
      success: 'bg-[#d1fab3] text-[#217005] border-[#a8f170]',
      warning: 'bg-[#fde473] text-[#9a5800] border-[#fddd00]',
      danger: 'bg-[#fde9ee] text-[#c0123c] border-[#fbd3dc]',
      neutral: 'bg-[#ebeef1] text-[#596171] border-[#d8dee4]',
      brand: 'text-brand-dark-grey bg-brand-beige',
      orderSuccess: 'bg-[#DCFCE7] text-[#15803D]',
      orderPending: 'bg-[#FEF3C7] text-[#B45309]',
      orderDanger: 'bg-[#FEE2E2] text-[#B91C1C]'
    },
    size: {
      xs: 'text-xs font-medium py-1 px-1.5',
      sm: 'text-sm font-medium py-1 px-1.5',
      md: 'text-eyebrow'
    }
  },
  defaultVariants: {
    variant: 'brand',
    size: 'sm'
  }
})

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeProps> {}

export function Badge({ className, variant, size, children }: BadgeProps) {
  return <span className={badgeProps({ variant, size, className })}>{children}</span>
}
