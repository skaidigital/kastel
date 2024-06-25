'use server'

import { PRODUCT_PAGE_REVIEWS_PAGE_SIZE } from '@/data/constants'
import { env } from '@/env'
import { z } from 'zod'

const ProductRatingValidator = z.object({
  id: z.number(),
  sku: z.array(z.string()),
  rating: z.string(),
  votes: z.number()
})

const ServiceRatingValidator = z.object({
  id: z.number(),
  rating: z.string(),
  votes: z.number()
})

const ProductsRatingValidator = z.array(ProductRatingValidator)

interface LipscoreReview {
  rating: string
  votes: number
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
  const url = `https://api.lipscore.com/products?fields=rating,votes&api_key=${env.NEXT_PUBLIC_LIPSCORE_API_KEY}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Authorization': env.LIPSCORE_API_SECRET
    }
  })

  const products = await response.json()

  const validatedResponse = ProductsRatingValidator.safeParse(products)

  if (!validatedResponse.success) {
    return {
      rating: '0',
      votes: 0
    }
  }

  const findRatedProduct = validatedResponse.data.filter((product) => product.sku.includes(sku))

  if (!findRatedProduct.length) {
    return {
      rating: '0',
      votes: 0
    }
  }

  return {
    rating: findRatedProduct[0]?.rating || '0',
    votes: findRatedProduct[0]?.votes || 0
  }
}

export async function getProductIdSku(sku: string) {
  const productUrl = `https://api.lipscore.com/products?fields=rating,votes&api_key=${env.NEXT_PUBLIC_LIPSCORE_API_KEY}`
  const response = await fetch(productUrl, {
    method: 'GET',
    headers: {
      'X-Authorization': env.LIPSCORE_API_SECRET
    }
  })

  const products = await response.json()

  const validatedResponse = ProductsRatingValidator.safeParse(products)

  if (!validatedResponse.success) {
    return undefined
  }

  const findProductId = validatedResponse.data.filter((product) => product.sku.includes(sku))

  const productId = findProductId[0]?.id

  if (!productId) {
    return undefined
  }

  return productId
}

const productReviewValidator = z.object({
  rating: z.number().optional().nullable(),
  created_at: z.string(),
  internal_order_id: z.string().optional().nullable(),
  text: z.string(),
  user: z.object({
    short_name: z.string()
  })
})

export type ProductReview = z.infer<typeof productReviewValidator>

const productReviewsValidator = z.array(productReviewValidator)

/**
 * Get Lipscore reviews for a product
 * @param internalId Lipscore's internal product id
 * @returns Lipscore reviews array
 */
export async function getProductReviews(internalId: string, page: number = 1) {
  const pageSize = PRODUCT_PAGE_REVIEWS_PAGE_SIZE
  const reviewUrl = ` https://api.lipscore.com/products/${internalId}/reviews?api_key=${env.NEXT_PUBLIC_LIPSCORE_API_KEY}&page=${page}&per_page=${pageSize}`

  const response = await fetch(reviewUrl, {
    method: 'GET',
    headers: {
      'X-Authorization': env.LIPSCORE_API_SECRET
    }
  })

  const reviews = await response.json()

  const validatedReviews = productReviewsValidator.safeParse(reviews)

  if (!validatedReviews.success) {
    console.error(validatedReviews.error)

    return []
  }

  return validatedReviews.data
}

export async function getServiceReview() {
  const serviceReviewUrl = `https://api.lipscore.com/products/9307087?fields=rating,votes&api_key=${env.NEXT_PUBLIC_LIPSCORE_API_KEY}`
  const serviceResponse = await fetch(serviceReviewUrl, {
    method: 'GET',
    headers: {
      'X-Authorization': env.LIPSCORE_API_SECRET
    }
  })

  const serviceReview = await serviceResponse.json()

  const validatedResponse = ServiceRatingValidator.safeParse(serviceReview)

  if (!validatedResponse.success) {
    return {
      rating: '0',
      votes: 0,
      reviews: []
    }
  }

  const reviewUrl = ` https://api.lipscore.com/products/9307087/reviews?api_key=${env.NEXT_PUBLIC_LIPSCORE_API_KEY}&rating=5`

  const response = await fetch(reviewUrl, {
    method: 'GET',
    headers: {
      'X-Authorization': env.LIPSCORE_API_SECRET
    }
  })

  const reviews = await response.json()

  const validatedReviews = productReviewsValidator.safeParse(reviews)

  if (!validatedReviews.success) {
    const serviceReview = {
      rating: validatedResponse.data.rating || '0',
      votes: validatedResponse.data.votes || 0,
      reviews: []
    }

    return serviceReview
  }

  return {
    rating: validatedResponse.data.rating || '0',
    votes: validatedResponse.data.votes || 0,
    reviews: validatedReviews.data
  }
}
