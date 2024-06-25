'use client'

import { Heading } from '@/components/base/Heading'
import { Text } from '@/components/base/Text'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
}
export function Card({ children, className }: Props) {
  return (
    <div className={cn('flex flex-col border border-brand-light-grey', className)}>{children}</div>
  )
}

interface CardTitleProps {
  children: React.ReactNode
}

export function CardTitle({ children }: CardTitleProps) {
  return <Heading className="mb-4 text-md normal-case">{children}</Heading>
}

interface CardContentProps {
  children: React.ReactNode
}

export function CardContent({ children }: CardContentProps) {
  return <div className="flex grow flex-col rounded-t-[4px] bg-white p-6">{children}</div>
}

interface CardButtonProps {
  children: React.ReactNode
  className?: string
}

// TODO find out why it is not rounded
export function CardButton({ children, className }: CardButtonProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center rounded-b-[4px] bg-brand-sand py-3 font-medium transition-colors duration-100 ease-in-out hover:bg-brand-primary hover:text-white focus:bg-brand-primary focus:text-white',
        className
      )}
    >
      <Text size="sm" className="font-medium">
        {children}
      </Text>
    </div>
  )
}
