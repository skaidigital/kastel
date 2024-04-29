import { getDictionary } from '@/app/dictionaries';
import { AddToCartButton } from '@/components/ProductForm/AddToCartButton';
import { VariantSelector } from '@/components/VariantSelector';
import { MobileAddToCartDrawer } from '@/components/pages/ProductPage/MobileAddToCartDrawer';
import { Product, ProductOption, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { SizeGuideProps } from '@/lib/sanity/types';
import { getProductInventory } from './hooks';

export type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

interface Props {
  productId: string;
  type: Product['type'];
  variants: ProductVariant[];
  sizeGuide?: SizeGuideProps;
  options?: ProductOption[];
}

export async function ProductForm({ productId, type, sizeGuide, options, variants }: Props) {
  if (!variants || !productId) return null;

  const [inventory, dictionaryResponse] = await Promise.all([
    getProductInventory(productId),
    getDictionary()
  ]);

  const dictionary = dictionaryResponse.product_page;

  if (!inventory) return null;

  return (
    <MobileAddToCartDrawer
      productId={productId}
      productType={type}
      variants={variants}
      inventory={inventory}
      addToCartText={dictionary.add_to_cart}
      selectSizeText={dictionary.choose_size}
    >
      <div id="product-form" className="flex flex-col gap-y-8">
        {options && variants && (
          <VariantSelector
            inventory={inventory}
            options={options}
            sizeGuide={sizeGuide}
            featuredOptions={[]}
            variants={variants}
            dictionary={dictionary}
          />
        )}
        <div className="w-full">
          <AddToCartButton
            productId={productId}
            productType={type}
            variants={variants}
            inventory={inventory}
            addToCartText={dictionary.add_to_cart}
            selectSizeText={dictionary.choose_size}
          />
        </div>
      </div>
    </MobileAddToCartDrawer>
  );
}
