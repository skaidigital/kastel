import { getDictionary } from '@/app/dictionaries';
import { AddToCartButton } from '@/components/ProductForm/AddToCartButton';
import { VariantSelector } from '@/components/VariantSelector';
import { OutOfStockNotificationForm } from '@/components/pages/ProductPage/OutOfStockNotificationForm/OutOfStockNotification';
import { Product, ProductOption, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { Text } from '../base/Text';
import { ProductInventoryResponse } from './hooks';

export type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

interface Props {
  productId: string;
  type: Product['type'];
  options?: ProductOption[];
  variants: ProductVariant[];
}

export async function ProductForm({ productId, type, options, variants }: Props) {
  if (!variants || !productId) return null;
  const dictionaryResponse = await getDictionary();

  // const [inventory, dictionaryResponse] = await Promise.all([
  //   getProductInventory(productId),
  //   getDictionary()
  // ]);

  const dictionary = dictionaryResponse.product_page;

  // if (!inventory) return null;
  const inventory: ProductInventoryResponse = {
    availableForSale: true,
    totalInventory: 50,
    priceRange: {
      minVariantPrice: {
        amount: '200',
        currencyCode: 'NOK'
      },
      maxVariantPrice: {
        amount: '400',
        currencyCode: 'NOK'
      }
    },
    variants: {
      edges: variants.map((variant) => ({
        node: {
          id: variant.id,
          availableForSale: true,
          quantityAvailable: 50
        }
      }))
    }
  };

  return (
    <>
      {options && variants && (
        <VariantSelector
          inventory={inventory}
          options={options}
          featuredOptions={[]}
          variants={variants}
          dictionary={dictionary}
        />
      )}
      {/* <StockHandler
        productType={type}
        inventory={inventory}
        dictionary={dictionary}
        variants={variants}
      /> */}
      <div className="w-full">
        <AddToCartButton
          productId={productId}
          productType={type}
          variants={variants}
          inventory={inventory}
          addToCartText={dictionary.add_to_cart}
          selectSizeText={dictionary.choose_size}
        />
        <div className="my-2 flex justify-center">
          <Text as="p" size="sm" className=" text-brand-dark-grey">
            Eller
          </Text>
        </div>
        <AddToCartButton
          productId={productId}
          productType={type}
          variants={variants}
          inventory={inventory}
          addToCartText={dictionary.add_to_cart}
          selectSizeText={dictionary.choose_size}
        />
      </div>
      <OutOfStockNotificationForm
        productType={type}
        variants={variants}
        inventory={inventory}
        dictionary={dictionary.back_in_stock_notification}
        className="border-brand-border border p-5"
      />
    </>
  );
}
