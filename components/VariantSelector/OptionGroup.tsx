'use client';

import { Combination } from '@/components/VariantSelector';
import { ProductOption } from '@/components/pages/ProductPage/hooks';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';

interface Props {
  option: ProductOption;
  options: ProductOption[];
  combinations: Combination[];
}

export function OptionGroup({ option, options, combinations }: Props) {
  // const optionType = option.type;
  // const isColor = optionType === 'color';

  const searchParams = useSearchParams();

  const [selectedOption, setSelectedOption] = useQueryState(option.name.toLowerCase());

  return (
    <dl key={option.name}>
      <dt className="text-eyebrow mb-4 uppercase">
        {option.name}
        {selectedOption && `: ${selectedOption}`}
      </dt>
      <dd className="flex flex-wrap gap-3">
        {option.values.map((value) => {
          const optionNameLowerCase = option.name.toLowerCase();

          const optionSearchParams = new URLSearchParams(searchParams.toString());

          optionSearchParams.set(optionNameLowerCase, value.title);

          const filtered = Array.from(optionSearchParams.entries()).filter(([key, value]) =>
            options.find(
              (option) =>
                option.name.toLowerCase() === key && option.values.some((v) => v.title === value)
            )
          );

          const isAvailableForSale = combinations.find((combination) =>
            filtered.every(
              ([key, value]) => combination[key] === value && combination.availableForSale
            )
          );

          const isActive = selectedOption === value.title;

          return (
            <button
              key={value.title}
              onClick={() => {
                setSelectedOption(value.title.toLowerCase());
              }}
              title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
              className={cn(
                'border-brand-border text-eyebrow flex min-w-[48px] items-center justify-center rounded-project border px-2 py-1 uppercase',
                isActive && 'cursor-default border-brand-dark-grey',
                !isAvailableForSale &&
                  '!text-eyebrow relative z-10 overflow-hidden bg-neutral-100 text-brand-mid-grey before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform'
                // isColor && 'h-6'
              )}
            >
              {/* {!isColor && value.title} */}
            </button>
          );
        })}
      </dd>
    </dl>
  );
}
