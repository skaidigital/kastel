import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/HoverCard';
import { SanityImage } from '@/components/sanity/SanityImage';
import { ProductCard } from '@/components/shared/ProductCard';
import { HotspotImageProps } from '@/lib/sanity/types';

interface Props extends HotspotImageProps {
  sizes?: string;
}

// TODO improve type by omitting type
export function HotspotImage({ image, hotspots, sizes }: Props) {
  return (
    <>
      <SanityImage image={image} fill sizes={sizes} className="-z-1 absolute" />
      {hotspots.map((hotspot) => {
        const hasSizeRange =
          hotspot.type === 'product' && hotspot?.sizes?.filter((size) => size.type === 'size')[0];
        const lowestSize = (hasSizeRange && hasSizeRange?.options[0]) || undefined;
        const highestSize =
          (hasSizeRange && hasSizeRange?.options[hasSizeRange?.options.length - 1]) || undefined;
        return (
          <HoverCard key={hotspot.x + hotspot.y} openDelay={0} closeDelay={0}>
            <HoverCardTrigger
              style={{
                position: 'absolute',
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)' // Centers the hotspot marker
              }}
              className="size-8 rounded-full"
            >
              <div className="absolute h-full w-full animate-blink rounded-full bg-black" />
              <div className="relative flex h-full w-full items-center justify-center">
                <span className="size-2 rounded-full bg-white" />
              </div>
            </HoverCardTrigger>
            {hotspot?.type === 'text' && (
              <HoverCardContent side="top">{hotspot.description}</HoverCardContent>
            )}
            {hotspot.type === 'product' && (
              <HoverCardContent side="top" className="w-[320px] border-none p-0">
                <ProductCard product={hotspot} />
              </HoverCardContent>
            )}
          </HoverCard>
        );
      })}
    </>
  );
}
