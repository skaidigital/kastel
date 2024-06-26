import { cn } from '@/lib/utils'

interface Props {
  label: string
  value: string
  className?: string
  valueClassName?: string
}

export function ValuePair({ label, value, className, valueClassName }: Props) {
  return (
    <div className={cn('flex flex-col gap-y-1', className)}>
      {label && (
        <span className="font-nature-lab-body text-nature-lab-sm text-brand-mid-grey">
          {label}:
        </span>
      )}
      {value && (
        <span
          className={cn(
            'font-nature-lab-heading text-nature-lab-heading-xs uppercase',
            valueClassName
          )}
        >
          {value}
        </span>
      )}
    </div>
  )
}
