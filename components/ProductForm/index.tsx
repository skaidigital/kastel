import { getDictionary } from '@/app/dictionaries';
import { AddToCartButton } from '@/components/ProductForm/AddToCartButton';
import { VippsHurtigkasseButton } from '@/components/ProductForm/VippsHurtigkasseButton';
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
  type: Product['type'];
  variants: ProductVariant[];
  sizeGuide?: SizeGuideProps;
  options?: ProductOption[];
}

export async function ProductForm({ productId, type, sizeGuide, options, variants, lang }: Props) {
  const { product_page: dictionary } = await getDictionary({ lang });

  if (!variants || !productId) return null;

  return (
    <MobileAddToCartDrawer
      productId={productId}
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
        <div className="flex w-full flex-col items-center gap-y-2">
          <AddToCartButton
            productId={productId}
            productType={type}
            variants={variants}
            addToCartText={dictionary.add_to_cart}
            selectSizeText={dictionary.choose_size}
          />
          <span className="text-sm">Eller</span>
          <VippsHurtigkasseButton variants={variants} productType={type} productId={productId} />
        </div>
      </div>
    </MobileAddToCartDrawer>
  );
}
