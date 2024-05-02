'use client';

import { Dictionary } from '@/app/dictionaries';
import { ProductInventoryResponse } from '@/components/ProductForm/hooks';
import { OptionGroup } from '@/components/VariantSelector/OptionGroup';
import { ProductOption, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { SizeGuideProps } from '@/lib/sanity/types';

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
  sizeGuide?: SizeGuideProps;
}

export function VariantSelector({
  inventory,
  options,
  featuredOptions,
  variants,
  sizeGuide,
  dictionary
}: Props) {
  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale:
      inventory.variants.edges.find((edge) => edge.node.id === variant.id)?.node
        ?.availableForSale || false,
    ...variant.selectedOptions
      ?.filter(
        (option): option is { value: string; name: string; slug: string } => option !== undefined
      )
      .reduce(
        (accumulator, option) => ({
          ...accumulator,
          [option.name.toLowerCase()]: option.value
        }),
        {} as Record<string, string>
      )
  }));

  const filteredOptions = filterOptions(variants, options, featuredOptions);

  return filteredOptions.map((option) => {
    return (
      <OptionGroup
        key={option.name}
        option={option}
        sizeGuide={sizeGuide}
        chooseSizeText={dictionary.choose_size}
        sizeGuideText={dictionary.size_guide}
        combinations={combinations}
      />
    );
  });
}

export function filterOptions(
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
