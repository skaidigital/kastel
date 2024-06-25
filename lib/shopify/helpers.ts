import { ThrottleStatusSchema } from './validators'

// Global variable to keep track of the last known throttle status
export let lastThrottleStatus: ThrottleStatusSchema | null = null

// Function to update the last throttle status
export function updateLastThrottleStatus(throttleStatus: ThrottleStatusSchema) {
  lastThrottleStatus = throttleStatus
}

export function removeProductGid(id: string) {
  return id.replace('gid://shopify/Product/', '')
}
export function removeVariantGid(id: string) {
  return id.replace('gid://shopify/ProductVariant/', '')
}

export function addVariantGid(id: string) {
  return `gid://shopify/ProductVariant/${id}`
}
