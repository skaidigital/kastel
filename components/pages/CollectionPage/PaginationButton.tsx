'use client'

import { Button } from '@/components/Button'
import { cn, createPageURL } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface Props {
  children: React.ReactNode
  type: 'previous' | 'next'
  className?: string
}

export function PaginationButton({ children, type, className }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  if (type === 'previous' && currentPage === 1) {
    return null
  }

  const href = createPageURL({
    pageNumber: type === 'previous' ? currentPage - 1 : currentPage + 1,
    searchParams,
    pathname
  })

  return (
    <Button asChild variant={type === 'previous' ? 'ghost' : 'primary'} size="sm">
      <Link href={href} className={cn(className)}>
        {children}
      </Link>
    </Button>
  )
}
