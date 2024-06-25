import { ShopifyErrorLike } from '@/app/api/shopify/types'
import { FulfillmentStatus, OrderFinancialStatus } from '@/lib/shopify/customer/types'
import { Money } from '@/lib/shopify/types'

export const isObject = (object: unknown): object is Record<string, unknown> => {
  return typeof object === 'object' && object !== null && !Array.isArray(object)
}

export const isShopifyError = (error: unknown): error is ShopifyErrorLike => {
  if (!isObject(error)) return false

  if (error instanceof Error) return true

  return findError(error)
}

function findError<T extends object>(error: T): boolean {
  if (Object.prototype.toString.call(error) === '[object Error]') {
    return true
  }

  const prototype = Object.getPrototypeOf(error) as T | null

  return prototype === null ? false : findError(prototype)
}

export function formatPrice(price: Money) {
  if (!price) return null

  const amountInt = parseInt(price.amount)

  const formattedPrice = new Intl.NumberFormat('no-NB', {
    style: 'currency',
    currency: price.currencyCode
  }).format(amountInt)

  return formattedPrice
}

export function extractGid(id: string) {
  return id.split('/').pop()
}

export function getOrderFinancialStatusBadgeVariant(status: OrderFinancialStatus) {
  switch (status) {
    case 'AUTHORIZED':
      return 'orderPending'
    case 'PAID':
      return 'orderSuccess'
    case 'PARTIALLY_PAID':
      return 'orderDanger'
    case 'PENDING':
      return 'orderPending'
    case 'REFUNDED':
      return 'orderSuccess'
    case 'VOIDED':
      return 'orderDanger'
    default:
      return 'orderPending'
  }
}

export function getOrderFullfillmentStatusBadgeVariant(status?: FulfillmentStatus) {
  switch (status) {
    case 'CANCELLED':
      return 'orderPending'
    case 'ERROR':
      return 'orderDanger'
    case 'FAILURE':
      return 'orderDanger'
    case 'SUCCESS':
      return 'orderSuccess'
    default:
      return 'orderPending'
  }
}
