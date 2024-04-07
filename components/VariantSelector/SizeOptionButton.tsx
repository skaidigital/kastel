'use client';

import { Badge } from '@/components/Badge';
import { textProps } from '@/components/base/Text';
import { cn } from '@/lib/utils';

interface Props {
  value: string;
  optionName: string;
  isAvailableForSale: boolean;
  isFeatured: boolean;
  reccommendedText: string;
  isActive: boolean;
  setSelectedSize: (value: string) => void;
}

export function SizeOptionButton({
  value,
  optionName,
  isAvailableForSale,
  isFeatured,
  reccommendedText,
  isActive,
  setSelectedSize
}: Props) {
  return (
    <button
      key={value}
      onClick={() => setSelectedSize(value.toLowerCase())}
      title={`${optionName} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
      className={cn(
        'flex items-center justify-between gap-y-1 rounded-project border border-brand-border px-3 py-2 hover:border-brand-mid-grey focus:border-brand-mid-grey',
        isActive && 'border-brand-dark-grey',
        !isAvailableForSale &&
          'relative z-10 overflow-hidden bg-neutral-100 !text-eyebrow text-brand-mid-grey before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform',
        textProps({ size: 'eyebrow' })
      )}
    >
      {value}
      {isFeatured && (
        <Badge size="sm" variant="neutral">
          {reccommendedText}
        </Badge>
      )}
    </button>
  );
}
