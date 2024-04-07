import { MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { productCardValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const reccommmendedProductValidator = z.array(productCardValidator);

export type ReccommendedProductPayload = z.infer<typeof reccommmendedProductValidator>;

export function getReccommendedProductsQuery(market: MarketValues) {
  return groq`
  *[_type == "merchandising" && _id == "merchandising"][0].reccommendedProducts[]->{
    ${fragments.getProductCard(market)}
  }`;
}
