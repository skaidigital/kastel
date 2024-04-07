'use client';

import { Dictionary } from '@/app/dictionaries';
import { ProductInventory } from '@/components/ProductForm/ProductInventory';
import { ProductInventoryResponse } from '@/components/ProductForm/hooks';
import { Product, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';
import { BackInStockDate } from './BackInStockDate';

interface Props {
  productType: Product['type'];
  variants: ProductVariant[];
  inventory: ProductInventoryResponse;
  dictionary: Dictionary['product_page'];
}

export function StockHandler({ productType, variants, inventory, dictionary }: Props) {
  const activeVariant = useActiveVariant({
    productType,
    variants
  });

  if (!activeVariant) return null;

  const id = activeVariant.id;
  const sku = activeVariant.sku;

  const activeVariantQuantityAvailable =
    inventory.variants.edges.find((edge) => edge.node.id === id)?.node?.quantityAvailable || 0;

  const isOutOfStock = activeVariantQuantityAvailable === 0;

  return (
    <div className="flex flex-col gap-y-1">
      {id && (
        <ProductInventory
          inventory={activeVariantQuantityAvailable}
          dictionary={dictionary.stock}
        />
      )}
      {isOutOfStock && (
        <BackInStockDate
          sku={sku || ''}
          expectedBackInStockText={dictionary.expected_back_in_stock}
        />
      )}
    </div>
  );
}
