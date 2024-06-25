'use client'

import { Text } from '@/components/base/Text'
import { SearchParams } from '@/lib/types'

interface Props {
  searchParams?: SearchParams
}

export function ActiveVariantDescription({ searchParams }: Props) {
  if (!searchParams) return null

  const paramString = Object.values(searchParams).join(' / ')

  return <Text>{paramString}</Text>
}
