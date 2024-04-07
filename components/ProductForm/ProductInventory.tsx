import { Dictionary } from '@/app/dictionaries';
import { Text } from '@/components/base/Text';
import { cn } from '@/lib/utils';

interface Props {
  inventory: number;
  dictionary: Dictionary['product_page']['stock'];
}

export function ProductInventory({ inventory, dictionary }: Props) {
  const { out_of_stock, low_stock, in_stock } = dictionary;
  const outOfStock = inventory === 0;
  const lowStock = inventory < 20 && inventory > 0;

  const lowStockTextFirst = low_stock.split('__AMOUNT__')[0];
  const lowStockTextLast = low_stock.split('__AMOUNT__')[1];

  return (
    <Text
      className={cn(
        'italic',
        outOfStock && 'text-red-700',
        lowStock && 'text-yellow-700',
        !outOfStock && !lowStock && 'text-green-700'
      )}
    >
      {outOfStock && <>{out_of_stock}</>}
      {lowStock && (
        <>
          {lowStockTextFirst} {inventory} {lowStockTextLast}
        </>
      )}
      {!outOfStock && !lowStock && <>{in_stock}</>}
    </Text>
  );
}
