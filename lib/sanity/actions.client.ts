'use client'

import { MARKET, MarketValues } from '@/data/constants'
import { env } from '@/env'
import { UploadIcon } from '@sanity/icons'
import { ToastParams, useToast } from '@sanity/ui'
import type { DocumentActionsContext } from 'sanity'

export function SyncProductToShopify(context: DocumentActionsContext) {
  const toast = useToast()
  const { documentId, getClient } = context

  async function sendData(market: MarketValues) {
    const marketName = MARKET[market].name

    const client = getClient({ apiVersion: '2022-12-07' })

    const marketsQuery = `*[_type == "product" && _id == $id][0].markets`
    const markets = await client.fetch(marketsQuery, { id: documentId }).catch((error) => {
      console.error('Error fetching markets', error)
      toast.push(errorToast)
      return []
    })

    if (!markets.includes(market)) {
      toast.push(missingMarketToast)
      return
    }

    toast.push(loadingToast)

    //todo: change this to a dynamic path based on the market
    const response = await fetch(`/no/no/api/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-secret-key': env.NEXT_PUBLIC_PRODUCT_SYNC_SECRET_KEY
      },
      body: JSON.stringify({ _id: documentId, market })
    })

    const data = await response.json()

    const isSuccess = data.success

    if (isSuccess) {
      toast.push(successToast(marketName))
    } else {
      toast.push(errorToast)
    }
  }

  return [
    {
      label: `Sync to ${MARKET.no.name} ${MARKET.no.flag}`,
      icon: UploadIcon,
      onHandle: async () => {
        await sendData(MARKET.no.id)
      }
    }
    // {
    //   label: `Sync to ${MARKET.sv.name} ${MARKET.sv.flag}`,
    //   icon: UploadIcon,
    //   onHandle: async () => {
    //     await sendData(MARKET.sv.id);
    //   }
    // }
  ]
}

const loadingToast: ToastParams = {
  status: 'info',
  title: 'Loading...',
  description:
    "This usually takes less than 10 seconds. Feel free to leave the page. A notification will appear when it's done.",
  duration: 5000,
  closable: true
}

function successToast(marketName: string): ToastParams {
  return {
    status: 'success',
    title: `Product sync successful to ${marketName}`,
    description: 'The product has been successfully synced to Shopify.',
    duration: 9999,
    closable: true
  }
}

const errorToast: ToastParams = {
  status: 'error',
  title: 'Sync failed',
  description: 'There was an issue syncing the product to Shopify. Please try again.',
  duration: 9999,
  closable: true
}

const missingMarketToast: ToastParams = {
  status: 'error',
  title: 'Market missing',
  description: 'The market is not available for this product.',
  duration: 9999,
  closable: true
}
