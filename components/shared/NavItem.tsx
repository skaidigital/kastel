import { Text, TextProps } from '@/components/base/Text'
import { LinkProps } from '@/lib/sanity/types'
import type { ReactNode } from 'react'
import { SanityLink } from '../sanity/SanityLink'

interface Props {
  link: LinkProps
  children: ReactNode
  size?: TextProps['size']
  className?: string
}

export const NavItem = ({ children, link, size, className }: Props) => {
  return (
    <SanityLink link={link} className={className || ''}>
      <Text className="link-animation py-3 hover:text-brand-mid-grey" size={size || undefined}>
        {children}
      </Text>
    </SanityLink>
  )
}
