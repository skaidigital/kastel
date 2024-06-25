import { sendGTMEvent } from '@next/third-parties/google'

export type EcommerceItem = {
  item_id: string
  item_name: string
  item_brand: string
  item_category?: string
  item_variant?: string
  price: number
  quantity: number
}

export type EcommerceObject = {
  event: string
  ecommerce: {
    currency: string
    value: number
    items: EcommerceItem[]
  }
}

export type ViewItemEventObject = {
  event: string
  ecommerce: {
    currency: string
    items: {
      item_id: string
      item_name: string
      item_brand: string
      item_category?: string
      item_variant?: string
      price: number
    }[]
  }
}

export function clearEcommerceInDataLayer() {
  sendGTMEvent({
    ecommerce: null
  })
}
