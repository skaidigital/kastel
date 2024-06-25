import { cn } from '@/lib/utils'

type Size = 'sm' | 'md'

interface Props {
  size?: Size
  className?: string
}

const LoadingDots = ({ size = 'sm', className }: Props) => {
  return (
    <span
      className={cn(
        'mx-2 inline-flex items-center',
        size === 'sm' && 'space-x-1',
        size === 'md' && 'space-x-2'
      )}
    >
      <Dot size={size} className={className} />
      <Dot size={size} className={cn('animation-delay-[200ms]', className)} />
      <Dot size={size} className={cn('animation-delay-[400ms]', className)} />
    </span>
  )
}

interface DotProps {
  size: Size
  className?: string
}

function Dot({ size = 'sm', className }: DotProps) {
  return (
    <span
      className={cn(
        'inline-block animate-blink rounded-md',
        size === 'sm' && 'h-1 w-1',
        size === 'md' && 'h-1.5 w-1.5',
        className
      )}
    />
  )
}

export default LoadingDots
