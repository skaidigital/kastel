import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger
} from '@/components/HybridTooltip'
import { TooltipProvider } from '@/components/Tooltip'
import { ProductCard } from '@/components/shared/ProductCard'

interface Props {
  children: React.ReactNode
  value: any
}

export function ProductHoverCard({ children, value }: Props) {
  return (
    <TooltipProvider delayDuration={0}>
      <HybridTooltip>
        <HybridTooltipTrigger className="bg-brand-primary px-1 font-medium text-white">
          {children}
        </HybridTooltipTrigger>
        <HybridTooltipContent className="border-none p-0">
          {value.product && <ProductCard product={value.product} />}
        </HybridTooltipContent>
      </HybridTooltip>
    </TooltipProvider>
  )
}
