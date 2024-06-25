import { Heading } from '@/components/base/Heading'
import { ReactNode } from 'react'

interface Props {
  heading: string
  children: ReactNode
  className?: string
}

export const NavSection = ({ heading, children, className }: Props) => {
  return (
    <div className={className || ''}>
      <Heading as="h3" size="sm">
        {heading}
      </Heading>
      <ul className="mt-6 space-y-4">{children}</ul>
    </div>
  )
}
