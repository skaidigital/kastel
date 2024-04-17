import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/HoverCard';
import { SanityImage } from '@/components/sanity/SanityImage';
import { ProductCard } from '@/components/shared/ProductCard';
import { HotspotImageProps } from '@/lib/sanity/types';

// TODO improve type by omitting type
// TODO add pulse animation
export function HotspotImage({ image, hotspots }: HotspotImageProps) {
  return (
    <>
      <SanityImage image={image} fill className="absolute object-cover" />
      {hotspots?.map((hotspot) => (
        <HoverCard key={hotspot.x + hotspot.y} openDelay={0} closeDelay={0}>
          <HoverCardTrigger
            style={{
              position: 'absolute',
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              transform: 'translate(-50%, -50%)' // Centers the hotspot marker
            }}
            className="size-8 rounded-full bg-black"
          >
            <div className="relative h-full w-full rounded-full">
              <span className="animate-ping absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white " />
            </div>
          </HoverCardTrigger>
          {hotspot.type === 'text' && (
            <HoverCardContent side="top">{hotspot.description}</HoverCardContent>
          )}
          {hotspot.type === 'product' && (
            <HoverCardContent side="top" className="w-[320px] border-none p-0">
              <ProductCard
                title={hotspot.title}
                mainImage={hotspot.mainImage}
                lifestyleImage={hotspot.lifestyleImage}
                badges={hotspot.badges}
                slug={hotspot.slug}
                type="product"
              />
            </HoverCardContent>
          )}
        </HoverCard>
      ))}
    </>
  );
}
