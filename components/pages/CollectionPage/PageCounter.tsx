'use client'

import { Text } from '@/components/base/Text'
import { useSearchParams } from 'next/navigation'

interface Props {
  pageCount: number
}

export function PageCounter({ pageCount }: Props) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  return (
    <div className="flex">
      <Text size="sm">
        Page {currentPage} of {pageCount}
      </Text>
    </div>
  )
}
