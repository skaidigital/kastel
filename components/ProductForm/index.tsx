import { getDictionary } from '@/app/dictionaries';
import { AddToCartButton } from '@/components/ProductForm/AddToCartButton';
import { StockHandler } from '@/components/ProductForm/StockHandler';
import { getProductInventory } from '@/components/ProductForm/hooks';
import { VariantSelector } from '@/components/VariantSelector';
import { OutOfStockNotificationForm } from '@/components/pages/ProductPage/OutOfStockNotificationForm/OutOfStockNotification';
import { Product, ProductOption, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';

export type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

interface Props {
  productId: string;
  type: Product['type'];
  options?: ProductOption[];
  featuredOptions?: string[];
  variants: ProductVariant[];
  usp: Product['usp'];
}

export async function ProductForm({
  productId,
  featuredOptions,
  type,
  options,
  variants,
  usp
}: Props) {
  if (!variants || !productId) return null;

  const [inventory, dictionaryResponse] = await Promise.all([
    getProductInventory(productId),
    getDictionary()
  ]);

  const dictionary = dictionaryResponse.product_page;

  if (!inventory) return null;

  return (
    <>
      {options && variants && (
        <VariantSelector
          inventory={inventory}
          options={options}
          featuredOptions={featuredOptions || []}
          variants={variants}
          dictionary={dictionary}
        />
      )}
      <StockHandler
        productType={type}
        inventory={inventory}
        dictionary={dictionary}
        variants={variants}
      />
      <AddToCartButton
        productId={productId}
        productType={type}
        variants={variants}
        inventory={inventory}
        addToCartText={dictionary.add_to_cart}
        selectSizeText={dictionary.choose_size}
      />
      <div className="[&>*:first-child]:pt-0">
        <PortableTextRenderer value={usp} />
      </div>
      <OutOfStockNotificationForm
        productType={type}
        variants={variants}
        inventory={inventory}
        dictionary={dictionary.back_in_stock_notification}
        className="border border-brand-border p-5"
      />
    </>
  );
}
