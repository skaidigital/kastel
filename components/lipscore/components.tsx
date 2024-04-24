import { Text } from '../base/Text';
import { getProductRatingBySku } from './hook';

export async function ProductRating({ sku }: { sku: string }) {
  const productRating = await getProductRatingBySku(sku);

  const roundedRating = Number(productRating.rating).toFixed(1);
  return (
    <Text as="span" size="sm">
      (star) {roundedRating} ({productRating.votes})
    </Text>
  );
}
