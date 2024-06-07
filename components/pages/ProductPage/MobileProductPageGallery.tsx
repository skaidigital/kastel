import { Badge } from '@/components/Badge';
import { OnSaleBadge } from '@/components/OnSaleBadge';
import { Breadcrumbs } from '@/components/pages/ProductPage/Breadcrumbs';
import { MobileCarousel } from '@/components/shared/MobileCarousel';
import { LangValues } from '@/data/constants';
import { ProductGalleryProps, SanityImageProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  lang: LangValues;
  mainCategory?: { title: string; slug: string };
  mainImage: SanityImageProps;
  lifestyleImage?: SanityImageProps;
  galleryFemale?: ProductGalleryProps;
  galleryMale?: ProductGalleryProps;
  badges?: string[];
  isOnSale?: boolean;
  discountBadge?: React.ReactNode;
  className?: string;
}

export function MobileProductPageGallery({
  title,
  lang,
  mainCategory,
  mainImage,
  lifestyleImage,
  galleryFemale,
  galleryMale,
  badges,
  isOnSale,
  discountBadge,
  className
}: Props) {
  return (
    <div className={cn('relative w-full', className)}>
      <MobileCarousel
        mainImage={mainImage}
        lifestyleImage={lifestyleImage}
        galleryFemale={galleryFemale}
        galleryMale={galleryMale}
        lang={lang}
      />
      <div className="absolute left-3 top-3 flex flex-col gap-y-3">
        <Breadcrumbs productName={title} lang={lang} category={mainCategory} />
        <div className="flex items-center gap-x-1">
          {badges && badges.length > 0 && (
            <div className="absolute left-4 top-4 flex flex-col gap-y-4">
              {badges.map((badge, index) => (
                <Badge key={index}>{badge}</Badge>
              ))}
            </div>
          )}
          {isOnSale && <OnSaleBadge />}
          {discountBadge && discountBadge}
        </div>
      </div>
    </div>
  );
}
