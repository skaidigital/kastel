'use client';

import { Dictionary } from '@/app/dictionaries';
import { ProductInventoryResponse } from '@/components/ProductForm/hooks';
import { OptionGroup } from '@/components/VariantSelector/OptionGroup';
import { SizeSelector } from '@/components/VariantSelector/SizeSelector';
import { ProductOption, ProductVariant } from '@/components/pages/ProductPage/hooks';

export type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

interface Props {
  inventory: ProductInventoryResponse;
  options: ProductOption[];
  featuredOptions: string[];
  variants: ProductVariant[];
  dictionary: Dictionary['product_page'];
}

export function VariantSelector({
  inventory,
  options,
  featuredOptions,
  variants,
  dictionary
}: Props) {
  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale:
      inventory.variants.edges.find((edge) => edge.node.id === variant.id)?.node
        ?.availableForSale || false,
    ...variant.selectedOptions
      ?.filter((option): option is { value: string; name: string } => option !== undefined)
      .reduce(
        (accumulator, option) => ({
          ...accumulator,
          [option.name.toLowerCase()]: option.value
        }),
        {} as Record<string, string>
      )
  }));

  // Filter out any option where there are not a corresponding variant
  const filteredOptions = filterOptions(variants, options, featuredOptions);

  return filteredOptions.map((option) => {
    const optionType = option.type;
    const isSize = optionType === 'size';

    if (isSize)
      return (
        <SizeSelector
          key={option.name}
          option={option}
          options={options}
          featuredOptions={featuredOptions}
          combinations={combinations}
          showAllSizesText={dictionary.show_all_sizes}
          chooseSizeText={dictionary.choose_size}
          closeText={dictionary.close}
          reccommendedText={dictionary.reccommended}
        />
      );

    return (
      <OptionGroup
        key={option.name}
        option={option}
        options={options}
        combinations={combinations}
      />
    );
  });
}

function filterOptions(
  variants: ProductVariant[],
  options: ProductOption[],
  featuredOptions: string[]
) {
  // Gather all variant values
  const variantValues = variants.map((variant) => variant.selectedOptions?.[0]?.value);

  // Filter out any options not present in variants
  // and also filter featuredValues
  options.forEach((option) => {
    option.values = option.values.filter((value) => variantValues.includes(value.title));
    if (option.type === 'size') {
      featuredOptions = featuredOptions?.filter((value) => variantValues.includes(value));
    }
  });

  return options;
}
