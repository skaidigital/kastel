'use client'

import { ANALTYICS_EVENT_NAME } from '@/data/constants'
import { ViewItemEventObject, clearEcommerceInDataLayer } from '@/lib/gtm'
import { removeProductGid } from '@/lib/shopify/helpers'
import { sendGTMEvent } from '@next/third-parties/google'
import { useEffect } from 'react'

interface Props {
  productId: string
  productTitle: string
  price: number
  slug: string
  imageUrl: string
}

export function ViewItemEventTrigger({ productId, productTitle, price, slug, imageUrl }: Props) {
  const formattedProductId = removeProductGid(productId)

  const viewItemTrackingData: ViewItemEventObject | undefined = {
    event: ANALTYICS_EVENT_NAME.VIEW_ITEM,
    ecommerce: {
      currency: 'NOK',
      items: [
        {
          item_id: formattedProductId,
          item_name: productTitle,
          item_brand: 'Kastel Shoes',
          price: price
        }
      ]
    }
  }

  const _learnq = typeof window !== 'undefined' ? window._learnq : []

  const domain =
    process.env.NODE_ENV === 'production'
      ? `https://www.${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://localhost:3000'

  const klaviyoProduct = {
    Name: productTitle,
    ProductID: formattedProductId,
    // Categories:
    //   payload.product.collections == undefined
    //     ? null
    //     : payload.product.collections.edges.map((a) => a.node.title),
    ImageURL: imageUrl,
    URL: `${domain}/no/no/products/${slug}`,
    Brand: 'Kastel Shoes',
    Price: price
    // CompareAtPrice: payload.selectedVariant.compareAtPriceV2.amount,
  }

  useEffect(() => {
    clearEcommerceInDataLayer()
    sendGTMEvent(viewItemTrackingData)
    _learnq?.push(['track', 'Viewed Product', klaviyoProduct])
  }, [])

  return null
}
