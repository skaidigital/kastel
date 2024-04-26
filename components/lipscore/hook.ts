'use server';

import { env } from '@/env';
import { z } from 'zod';

const ProductRatingValidator = z.object({
  sku: z.array(z.string()),
  rating: z.string(),
  votes: z.number()
});

const ProductsRatingValidator = z.array(ProductRatingValidator);

interface LipscoreReview {
  rating: string;
  votes: number;
}

/**
 * Get Lipscore reviews for a product
 * @param sku Can be any product sku or any of its variants sku
 * @returns Lipscore review object
 * @example
 *   const review = await getLipscoreReviews('12345');
 *   { rating: '4.5', votes: 100 }
 *
 *   const review = await getLipscoreReviews('12345-variant');
 *   { rating: '4.5', votes: 100 }
 */

export async function getProductRatingBySku(sku: string): Promise<LipscoreReview> {
  const url = `https://api.lipscore.com/products?fields=rating,votes&api_key=${env.LIPSCORE_API_KEY}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Authorization': env.LIPSCORE_API_SECRET
    }
  });

  const products = await response.json();

  const validatedResponse = ProductsRatingValidator.safeParse(products);

  if (!validatedResponse.success) {
    return {
      rating: '0',
      votes: 0
    };
  }

  const findRatedProduct = validatedResponse.data.filter((product) => product.sku.includes(sku));

  if (!findRatedProduct.length) {
    return {
      rating: '0',
      votes: 0
    };
  }

  return {
    rating: findRatedProduct[0]?.rating || '0',
    votes: findRatedProduct[0]?.votes || 0
  };
}
