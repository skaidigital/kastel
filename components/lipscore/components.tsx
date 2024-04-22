import { Text } from '../base/Text';
import { getLipscoreReviews } from './hook';

export async function ProductRating({ sku }: { sku: string }) {
  const productRating = await getLipscoreReviews(sku);

  const roundedRating = Number(productRating.rating).toFixed(1);
  return (
    <Text as="p" size="sm">
      (star) {roundedRating} ({productRating.votes})
    </Text>
  );
}
