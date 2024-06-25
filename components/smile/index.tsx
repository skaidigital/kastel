'use client'

import { useCustomerId } from '@/components/smile/useCustomerId'
import SmileInit from './SmileInit'

export function Smile() {
  const { data, isLoading } = useCustomerId()

  const customerId = data?.customerId

  if (isLoading) {
    return null
  }

  const idWithoutGid = customerId?.split('gid://shopify/Customer/')[1]

  if (!idWithoutGid) {
    return null
  }

  return <SmileInit customerId={idWithoutGid} />
}
