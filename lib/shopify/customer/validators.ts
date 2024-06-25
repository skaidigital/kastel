import { z } from 'zod'

export const orderFinancialStatusValidator = z.enum([
  'AUTHORIZED',
  'PAID',
  'PARTIALLY_PAID',
  'PENDING',
  'REFUNDED',
  'VOIDED'
])

export const fulfillmentStatusValidator = z.enum(['CANCELLED', 'ERROR', 'FAILURE', 'SUCCESS'])
