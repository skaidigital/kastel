import { env } from '@/env'
import {
  AnalyticsEventName,
  ShopifyAnalyticsProduct,
  ShopifyPageViewPayload,
  ShopifySalesChannel,
  getClientBrowserParameters,
  sendShopifyAnalytics,
  useShopifyCookies
} from '@shopify/hydrogen-react'
import { CurrencyCode, LanguageCode } from '@shopify/hydrogen-react/storefront-api-types'
import { usePathname } from 'next/navigation'

const shopId = env.NEXT_PUBLIC_SHOPIFY_SHOP_ID
const currency = env.NEXT_PUBLIC_SHOPIFY_CURRENCY as CurrencyCode
const defaultLanguage = env.NEXT_PUBLIC_SHOPIFY_DEFAULT_LANGUAGE as LanguageCode

type SendPageViewPayload = {
  pageType?: string
  products?: ShopifyAnalyticsProduct[]
  collectionHandle?: string
  searchString?: string
  totalValue?: number
  cartId?: string
}

type SendAddToCartPayload = {
  cartId: string
  products?: ShopifyAnalyticsProduct[]
  totalValue?: ShopifyPageViewPayload['totalValue']
}

export function useShopifyAnalytics() {
  const pathname = usePathname()

  // Send page view event
  const sendPageView = (
    eventName: keyof typeof AnalyticsEventName,
    payload?: SendPageViewPayload
  ) => {
    return sendShopifyAnalytics({
      eventName,
      payload: {
        ...getClientBrowserParameters(),
        hasUserConsent: true,
        shopifySalesChannel: ShopifySalesChannel.headless,
        shopId: `gid://shopify/Shop/${shopId}`,
        currency,
        acceptedLanguage: defaultLanguage,
        ...payload
      }
    })
  }

  // Send add to cart event
  const sendAddToCart = ({ cartId, totalValue, products }: SendAddToCartPayload) =>
    sendPageView(AnalyticsEventName.ADD_TO_CART, {
      cartId,
      totalValue,
      products
    })

  // Set up cookies for Shopify analytics & enable user consent
  // TODO - Add user consent logic
  useShopifyCookies({
    hasUserConsent: true
  })

  return {
    sendPageView,
    sendAddToCart,
    pathname
  }
}
