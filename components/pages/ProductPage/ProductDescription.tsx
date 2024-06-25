import { Heading } from '@/components/base/Heading'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { cn } from '@/lib/utils'
import { PortableTextBlock } from 'next-sanity'

interface Props {
  heading: string
  content: PortableTextBlock[]
  className?: string
}

export function ProductDescription({ heading, content, className }: Props) {
  return (
    <div className={cn(className)}>
      <Heading as="h2" size="sm" className="mb-[-12px]">
        {heading}
      </Heading>
      <PortableTextRenderer value={content} />
    </div>
  )
}
