import { cn } from '@/lib/utils'

interface Props {
  itemsLength: number
  selectedIndex: number
  className?: string
}

export function Dots({ itemsLength, selectedIndex, className }: Props) {
  const arr = new Array(itemsLength).fill(0)
  return (
    <div className={cn('my-2 flex -translate-y-5 justify-center gap-1', className)}>
      {arr.map((_, index) => {
        const selected = index === selectedIndex
        return (
          <div
            className={cn({
              'h-2 w-2 rounded-full bg-indigo-400 transition-all duration-300': true,
              'opacity-50': !selected
            })}
            key={index}
          />
        )
      })}
    </div>
  )
}
