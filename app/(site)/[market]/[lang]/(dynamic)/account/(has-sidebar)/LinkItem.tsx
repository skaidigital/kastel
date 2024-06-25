'use client'

import { CustomLink } from '@/components/CustomLink'
import { useBaseParams } from '@/lib/hooks/useBaseParams'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface Props {
  href: string
  children: ReactNode
  className?: string
}

export function LinkItem({ href, children, className }: Props) {
  const pathname = usePathname()
  const { market, lang } = useBaseParams()

  const hrefWithMarketAndLang = `/${market}/${lang}${href}`
  const isActive = hrefWithMarketAndLang === pathname

  return (
    <CustomLink
      href={href}
      className={cn(
        'text-sm',
        isActive
          ? 'font-sembibold'
          : 'text-brand-mid-grey transition-all duration-100 ease-in-out hover:pl-1 hover:text-brand-dark-grey focus:pl-1 focus:text-brand-dark-grey',
        className
      )}
    >
      {children}
    </CustomLink>
  )
}
