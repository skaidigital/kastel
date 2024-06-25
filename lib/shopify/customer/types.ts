import {
  fulfillmentStatusValidator,
  orderFinancialStatusValidator
} from '@/lib/shopify/customer/validators'
import { z } from 'zod'

export type OrderFinancialStatus = z.infer<typeof orderFinancialStatusValidator>

export type FulfillmentStatus = z.infer<typeof fulfillmentStatusValidator>
