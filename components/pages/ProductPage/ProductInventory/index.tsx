import { getProductVariantInventory } from '@/components/pages/ProductPage/ProductInventory/hooks';

interface Props {
  variantId: string;
  className?: string;
}

export async function ProductInventory({ variantId, className }: Props) {
  if (!variantId) return null;

  const inventory = await getProductVariantInventory(variantId);

  if (!inventory) return null;

  const inventoryText = getInventoryText(inventory);

  return <div>{inventoryText}</div>;
}

function getInventoryText(inventory: number) {
  // Have for in stock, low stock, out of stock with numbers for low stock
  if (inventory === 0) return 'Out of stock';
  if (inventory < 10) return `Low stock (${inventory})`;
  return 'In stock';
}
