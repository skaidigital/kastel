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

// TODO inventory?
export function VariantSelector({
  inventory,
  options,
  featuredOptions,
  variants,
  sizeGuide,
  dictionary
}: Props) {
  // Filter out any option where there are not a corresponding variant
  const filteredOptions = filterOptions(variants, options, featuredOptions);

  return filteredOptions.map((option) => {
    const optionType = option.type;
    const isSize = optionType === 'size';

    return (
      <OptionGroup
        key={option.name}
        option={option}
        sizeGuide={sizeGuide}
        chooseSizeText={dictionary.choose_size}
        sizeGuideText={dictionary.size_guide}
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
