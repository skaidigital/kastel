import { CACHE_TAGS, MarketValues } from '@/data/constants'
import { loadQuery } from '@/lib/sanity/store'
import { groq } from 'next-sanity'
import { z } from 'zod'

const paymentProvider = z.enum([
  'amazonPay',
  'amex',
  'applePay',
  'googlePay',
  'masterCard',
  'mobilePay',
  'payPal',
  'samsungPay',
  'vipps',
  'visa'
])

export const paymentProvidersValidator = z.array(paymentProvider).optional()

export type PaymentProvidersPayload = z.infer<typeof paymentProvidersValidator>

export function getPaymentProvidersQuery(market: MarketValues) {
  const query = groq`
  *[_type == "settingsPaymentProviders"][0].paymentProviders_${market}[].paymentProvider
  `

  return query
}

export async function loadPaymentProviders(market: MarketValues) {
  const query = getPaymentProvidersQuery(market)

  return loadQuery<PaymentProvidersPayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.PAYMENT_PROVIDERS] } }
  )
}
