'use client';

import { Dictionary } from '@/app/dictionaries';
import { ProductInventoryResponse } from '@/components/ProductForm/hooks';
import {
  RadixSelect,
  RadixSelectContent,
  RadixSelectItem,
  RadixSelectTrigger,
  RadixSelectValue
} from '@/components/form/RadixSelect';
import { SanityImage } from '@/components/sanity/SanityImage';
import { cn } from '@/lib/utils';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { useEffect, useRef, useState } from 'react';
import { BundleItemSchema } from './hooks';

interface BundleProps {
  optionGroup: BundleItemSchema;
  dictionary: Dictionary['bundle'];
}

export function BundleSelection({ optionGroup, dictionary }: BundleProps) {
  // Slugify the title to use as a query parameter
  const slug = optionGroup.title.toLowerCase().replace(/\s/g, '-');
  const [selectedProduct, setSelectedProduct] = useQueryState(slug);
  const [selectedVariants, setSelectedVariants] = useQueryState(
    'variants',
    parseAsArrayOf(parseAsString)
  );

  function handleProductChange(productSlug: string) {
    // Check if the selectedProduct has a selected variant, remove if so
    if (selectedProduct && selectedVariants && selectedVariants.length > 0) {
      const activeProduct = optionGroup.product.find((product) => product.slug === selectedProduct);
      const activeVariant = activeProduct?.variants.find((variant) => {
        if (selectedVariants?.includes(variant.sku)) {
          return variant.sku;
        }
      });

      const newSelectedVariants = selectedVariants.filter(
        (variant) => variant !== activeVariant?.sku
      );

      if (newSelectedVariants.length === 0) {
        setSelectedVariants(null);
      } else {
        setSelectedVariants(newSelectedVariants);
      }
    }
    setSelectedProduct(productSlug);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2 ">
        {optionGroup.product.map((product) => {
          const activeProduct = selectedProduct === product.slug;
          return (
            <button
              key={product.slug}
              onClick={() => handleProductChange(product.slug)}
              className={cn(
                'aspect-h-4 aspect-w-3',
                activeProduct ? 'border-[1px] border-brand-dark-grey' : ''
              )}
            >
              <SanityImage image={product.image} fill className="" />
            </button>
          );
        })}
      </div>
      {selectedProduct && (
        <BundleSizeSelector
          key={selectedProduct}
          activeProductSlug={selectedProduct}
          optionGroup={optionGroup}
          dictionary={dictionary}
        />
      )}
    </div>
  );
}

interface BundleSizeSelectorProps {
  activeProductSlug: string;
  optionGroup: BundleItemSchema;
  dictionary: Dictionary['bundle'];
}

function BundleSizeSelector({
  activeProductSlug,
  optionGroup,
  dictionary
}: BundleSizeSelectorProps) {
  const fetchCompletedRef = useRef(false);

  const [stockData, setStockData] = useState<ProductInventoryResponse | null>(null);
  const [variants, setVariants] = useQueryState('variants', parseAsArrayOf(parseAsString));

  const activeProduct = optionGroup.product.find((product) => product.slug === activeProductSlug);
  const activeProductId = activeProduct?.id;

  useEffect(() => {
    if (!activeProductId || fetchCompletedRef.current) return;

    // Call the fetchData function
    fetchStockData(activeProductId)
      .then((data) => {
        setStockData(data);
        fetchCompletedRef.current = true;
      })
      .catch((error) => {
        console.error('Failed to fetch product inventory: ', error);
      });

    return () => {
      fetchCompletedRef.current = false;
    };
  }, [activeProductId]); // Run the effect when `activeProductSlug` changes

  if (!activeProductSlug) return null;

  const activeVariant = activeProduct?.variants.find((variant) =>
    variants?.includes(variant.sku)
  )?.sku;

  function handleChange(value: string) {
    const variantsToUpdate = variants || [];

    const existingVariantIndex = variants?.findIndex((sku) =>
      activeProduct?.variants.some((variant: any) => variant.sku === sku)
    );

    if (existingVariantIndex === undefined) {
      variantsToUpdate.push(value);
    } else if (existingVariantIndex !== -1) {
      variantsToUpdate[existingVariantIndex] = value;
    } else {
      // Add the new variant if it wasn't already selected
      variantsToUpdate.push(value);
    }

    setVariants(variantsToUpdate);
  }

  return (
    <>
      <RadixSelect
        onValueChange={(e) => {
          handleChange(e);
        }}
        defaultValue={activeVariant}
      >
        <RadixSelectTrigger>
          <RadixSelectValue placeholder={dictionary.bundle_select.choose_option} />
        </RadixSelectTrigger>
        <RadixSelectContent>
          {!stockData && (
            <RadixSelectItem value="loading" disabled>
              Loading...
            </RadixSelectItem>
          )}
          {stockData &&
            activeProduct?.variants.map((variant) => {
              // find the variant in the stock data
              const variantStock = stockData?.variants.edges.find(
                (stockVariant) => stockVariant.node.id === variant.gid
              );
              const availableForSale = variantStock?.node.availableForSale || false;

              return (
                <RadixSelectItem
                  key={variant.id}
                  value={variant.sku}
                  disabled={!availableForSale}
                  className="text-eyebrow uppercase"
                  defaultChecked={variant.sku === activeVariant}
                >
                  {variant.option1}
                  {!availableForSale && ` - (Out of Stock)`}
                </RadixSelectItem>
              );
            })}
        </RadixSelectContent>
      </RadixSelect>
    </>
  );
}

async function fetchStockData(activeProductId: string) {
  try {
    const stockResponse = await fetch('/api/getProductInventory', {
      method: 'POST',
      body: JSON.stringify({ id: activeProductId })
    });

    if (!stockResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const stockData: ProductInventoryResponse = await stockResponse.json();
    // setData(stockData); // Update the state with the fetched data@
    return stockData;
  } catch (error) {
    console.error('Failed to fetch product inventory: ', error);
    return null;
    // setData(null); // Optionally handle errors, for instance, by resetting the data state
  }
}
