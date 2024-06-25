import { BlogWidth } from '@/components/pages/BlogPost/hooks'
import { cn } from '@/lib/utils'

interface Props {
  width: BlogWidth
  children: React.ReactNode
  className?: string
}

export function BlogWidthContainer({ width, children, className }: Props) {
  return (
    <div
      className={cn(
        'mx-auto',
        width === 'wide' ? 'max-w-[--blog-post-container-lg]' : 'max-w-[--blog-post-container-md]',
        className
      )}
    >
      {children}
    </div>
  )
}
