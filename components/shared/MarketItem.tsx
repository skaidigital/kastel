'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  flag: React.ReactNode
  market: string
  language: string
  href: string
  isSelected: boolean
  onClick: (e: any) => void
}

export function MarketItem({ flag, market, language, onClick, isSelected }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-1 grow rounded-[4px] p-4',
        isSelected
          ? 'bg-brand-primary text-white'
          : 'bg-brand-sand text-brand-mid-grey hover:bg-brand-primary hover:text-white focus:bg-brand-primary focus:text-white'
      )}
    >
      <div className={cn('flex gap-x-4 lg:min-w-48')}>
        <div className="flex w-8 items-center lg:w-12">{flag}</div>
        <div className="flex flex-col items-start justify-start text-sm">
          <span className="font-medium">{market}</span>
          <span>{language}</span>
        </div>
      </div>
    </button>
  )
}
