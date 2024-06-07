import { getDictionary } from '@/app/dictionaries';
import { AddToCartButton } from '@/components/ProductForm/AddToCartButton';
import { VariantSelector } from '@/components/VariantSelector';
import { MobileAddToCartDrawer } from '@/components/pages/ProductPage/MobileAddToCartDrawer';
import { Product, ProductOption, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { LangValues } from '@/data/constants';
import { SizeGuideProps } from '@/lib/sanity/types';

export type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

interface Props {
  lang: LangValues;
  productId: string;
  productTitle: string;
  type: Product['type'];
  variants: ProductVariant[];
  sizeGuide?: SizeGuideProps;
  options?: ProductOption[];
}

export async function ProductForm({
  productId,
  productTitle,
  type,
  sizeGuide,
  options,
  variants,
  lang
}: Props) {
  const { product_page: dictionary } = await getDictionary({ lang });

  if (!variants || !productId) return null;

  return (
    <MobileAddToCartDrawer
      productId={productId}
      productTitle={productTitle}
      productType={type}
      variants={variants}
      addToCartText={dictionary.add_to_cart}
      selectSizeText={dictionary.choose_size}
    >
      <div id="product-form" className="flex flex-col gap-y-8">
        {options && variants && (
          <VariantSelector
            productId={productId}
            options={options}
            sizeGuide={sizeGuide}
            featuredOptions={[]}
            variants={variants}
            dictionary={dictionary}
          />
        )}
        <AddToCartButton
          productId={productId}
          productTitle={productTitle}
          productType={type}
          variants={variants}
          addToCartText={dictionary.add_to_cart}
          selectSizeText={dictionary.choose_size}
        />
      </div>
    </MobileAddToCartDrawer>
  );
}
