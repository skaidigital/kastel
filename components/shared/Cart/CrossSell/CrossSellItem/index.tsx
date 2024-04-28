import { Dictionary } from '@/app/dictionaries';
import { getProductInventory } from '@/components/ProductForm/hooks';
import { CrossSellItemLayout } from '@/components/shared/Cart/CrossSell/CrossSellItem/Layout';
import { CrossSellProduct } from '@/components/shared/Cart/CrossSell/hooks';

interface Props {
  product: CrossSellProduct;
  currencyCode: string;
  dictionary: Dictionary['cart_drawer']['cross_sell'];
  className?: string;
}

export async function CrossSellItem({ product, currencyCode, dictionary, className }: Props) {
  const inventory = await getProductInventory(product.id);

  if (!inventory) return null;

  return (
    <CrossSellItemLayout
      product={product}
      inventory={inventory}
      currencyCode={currencyCode}
      dictionary={dictionary}
      className={className}
    />
  );
}
