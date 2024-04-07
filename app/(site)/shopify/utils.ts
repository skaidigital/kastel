import { ShopifyErrorLike } from '@/app/(site)/shopify/types';
import { FulfillmentStatus, OrderFinancialStatus } from '@/lib/shopify/customer/types';
import { Money } from '@/lib/shopify/types';

export const isObject = (object: unknown): object is Record<string, unknown> => {
  return typeof object === 'object' && object !== null && !Array.isArray(object);
};

export const isShopifyError = (error: unknown): error is ShopifyErrorLike => {
  if (!isObject(error)) return false;

  if (error instanceof Error) return true;

  return findError(error);
};

function findError<T extends object>(error: T): boolean {
  if (Object.prototype.toString.call(error) === '[object Error]') {
    return true;
  }

  const prototype = Object.getPrototypeOf(error) as T | null;

  return prototype === null ? false : findError(prototype);
}

export function formatPrice(price: Money) {
  if (!price) return null;

  const amountInt = parseInt(price.amount);

  return new Intl.NumberFormat('no-NB', {
    style: 'currency',
    currency: price.currencyCode
  }).format(amountInt);
}

export function extractGid(id: string) {
  return id.split('/').pop();
}

export function getOrderFinancialStatusBadgeVariant(status: OrderFinancialStatus) {
  switch (status) {
    case 'AUTHORIZED':
      return 'neutral';
    case 'PAID':
      return 'success';
    case 'PARTIALLY_PAID':
      return 'warning';
    case 'PENDING':
      return 'neutral';
    case 'REFUNDED':
      return 'success';
    case 'VOIDED':
      return 'warning';
    default:
      return 'neutral';
  }
}

export function getOrderFullfillmentStatusBadgeVariant(status?: FulfillmentStatus) {
  switch (status) {
    case 'CANCELLED':
      return 'neutral';
    case 'ERROR':
      return 'danger';
    case 'FAILURE':
      return 'danger';
    case 'SUCCESS':
      return 'success';
    default:
      return 'neutral';
  }
}
