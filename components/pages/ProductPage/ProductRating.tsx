'use client';

import { Text } from '@/components/base/Text';
import { StarRating } from '@/components/pages/ProductPage/StarRating';

interface Props {
  rating: number;
  ratingCount: number;
}

export function ProductRating({ rating, ratingCount }: Props) {
  return (
    <div className="flex items-center">
      <StarRating rating={Math.round(rating)} />
      <Text className="ml-1">{`(${ratingCount})`}</Text>
    </div>
  );
}
