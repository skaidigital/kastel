import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger
} from '@/components/HybridTooltip';
import { TooltipProvider } from '@/components/Tooltip';
import { SanityImage } from '@/components/sanity/SanityImage';
import { ProductCard } from '@/components/shared/ProductCard';
import { HotspotImageProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface Props extends HotspotImageProps {
  sizes?: string;
  children?: React.ReactNode;
}

export function HotspotImage({ image, hotspots, sizes, children }: Props) {
  return (
    <div className="h-full w-full">
      <SanityImage image={image} fill sizes={sizes} className="-z-1 absolute inset-0" />
      <TooltipProvider>
        {hotspots.map((hotspot) => {
          return (
            <div
              key={hotspot.x + hotspot.y}
              style={{
                position: 'absolute',
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className="relative"
            >
              <HybridTooltip delayDuration={0}>
                <HybridTooltipTrigger>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
                    <span className="block h-2 w-2 rounded-full bg-white"></span>
                  </div>
                </HybridTooltipTrigger>
                <HybridTooltipContent
                  side="top"
                  align="center"
                  className={cn(hotspot.type === 'product' && 'w-[320px] border-none p-0')}
                >
                  {hotspot.type === 'text' && <div>{hotspot.description}</div>}
                  {hotspot.type === 'product' && <ProductCard product={hotspot} />}
                </HybridTooltipContent>
              </HybridTooltip>
            </div>
          );
        })}
      </TooltipProvider>
      {children}
    </div>
  );
}
