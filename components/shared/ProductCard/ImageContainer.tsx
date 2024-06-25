'use client'

import { AspectRatio } from '@radix-ui/react-aspect-ratio'

interface Props {
  children: React.ReactNode
}

export function ImageContainer({ children }: Props) {
  return (
    <AspectRatio ratio={3 / 4} className="relative w-full overflow-hidden">
      {children}
    </AspectRatio>
  )
}
