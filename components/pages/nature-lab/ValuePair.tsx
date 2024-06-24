import { cn } from '@/lib/utils';

interface Props {
  label: string;
  value: string;
  className?: string;
}

export function ValuePair({ label, value, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-y-1', className)}>
      {label && (
        <span className="font-nature-lab-body text-nature-lab-sm text-brand-mid-grey">
          {label}:
        </span>
      )}
      {value && (
        <span className="font-nature-lab-heading text-nature-lab-heading-xs uppercase text-nature-lab-dark-grey">
          {value}
        </span>
      )}
    </div>
  );
}
