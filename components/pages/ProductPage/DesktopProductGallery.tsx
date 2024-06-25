'use client'

import { Badge } from '@/components/Badge'
import { OnSaleBadge } from '@/components/OnSaleBadge'
import Video from '@/components/Video'
import { Breadcrumbs } from '@/components/pages/ProductPage/Breadcrumbs'
import { useProductPageContext } from '@/components/pages/ProductPage/Context'
import { GenderGalleryButtons } from '@/components/pages/ProductPage/GenderGalleryButtons'
import { SanityImage } from '@/components/sanity/SanityImage'
import { LangValues } from '@/data/constants'
import { ProductGalleryProps, SanityImageProps } from '@/lib/sanity/types'

interface Props {
  title: string
  lang: LangValues
  mainImage: SanityImageProps
  mainCategory?: {
    title: string
    slug: string
  }
  lifestyleImage?: SanityImageProps
  galleryFemale?: ProductGalleryProps
  galleryMale?: ProductGalleryProps
  badges?: string[]
  isOnSale?: boolean
  discountBadge?: React.ReactNode
}

export function DesktopProductGallery({
  title,
  lang,
  mainImage,
  mainCategory,
  lifestyleImage,
  galleryFemale,
  galleryMale,
  badges,
  isOnSale,
  discountBadge
}: Props) {
  const hasLifestyleImage = lifestyleImage?.asset?._ref
    ? (lifestyleImage as SanityImageProps)
    : undefined

  const { activeGender } = useProductPageContext()

  return (
    <div className="hidden flex-grow justify-start lg:flex lg:flex-col">
      {galleryFemale && galleryMale && (
        <div className="relative">
          <div className="absolute right-0 top-0 z-10 p-4">
            <GenderGalleryButtons />
          </div>
        </div>
      )}
      {mainImage && (
        <div className="aspect-h-1 aspect-w-1 relative h-full w-full">
          <SanityImage
            priority
            image={mainImage}
            sizes="(max-width: 1024px) 100vw, 70vw"
            fill
            className="absolute h-auto w-full object-cover object-center"
          />
          <div className="absolute left-4 top-4 flex flex-col gap-y-4">
            <Breadcrumbs productName={title} lang={lang} category={mainCategory} />
            <div className="flex gap-x-1">
              {badges && badges.length > 0 && (
                <div className="gap-x-1">
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
      )}
      {hasLifestyleImage && (
        <div className="aspect-h-4 aspect-w-3 relative h-full w-full">
          <SanityImage
            priority
            image={lifestyleImage as SanityImageProps}
            sizes="(max-width: 1024px) 100vw, 70vw"
            fill
            className="absolute h-auto w-full object-cover"
          />
        </div>
      )}
      {activeGender === 'female' &&
        galleryFemale &&
        galleryFemale.length > 0 &&
        galleryFemale.map((item, index) => {
          if (item.type === 'figure') {
            return (
              <div
                key={item.asset._ref && item.asset._ref}
                className="aspect-h-4 aspect-w-3 relative h-full w-full"
              >
                {item.asset._ref && (
                  <SanityImage
                    priority={index === 0 || index === 1}
                    key={index}
                    image={item}
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    fill
                    className="absolute h-auto w-full object-cover"
                  />
                )}
              </div>
            )
          }
          if (item.type === 'mux.video') {
            return (
              <div
                key={item.videoUrl && item.videoUrl}
                className="aspect-h-4 aspect-w-3 relative mb-10 h-full w-full"
              >
                {item.videoUrl && (
                  <Video
                    playbackId={item.videoUrl}
                    resolution="HD"
                    loading={index === 0 || index === 1 ? 'eager' : 'lazy'}
                  />
                )}
              </div>
            )
          }
          return null
        })}
      {activeGender === 'male' &&
        galleryMale &&
        galleryMale.length > 0 &&
        galleryMale.map((item, index) => {
          if (item.type === 'figure') {
            return (
              <div
                key={item.asset._ref && item.asset._ref}
                className="aspect-h-4 aspect-w-3 relative h-full w-full"
              >
                {item.asset._ref && (
                  <SanityImage
                    priority={index === 0 || index === 1}
                    key={index}
                    image={item}
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    fill
                    className="absolute h-auto w-full object-cover"
                  />
                )}
              </div>
            )
          }
          if (item.type === 'mux.video') {
            return (
              <div
                key={item.videoUrl && item.videoUrl}
                className="aspect-h-4 aspect-w-3 relative mb-10 h-full w-full"
              >
                {item.videoUrl && (
                  <Video
                    playbackId={item.videoUrl}
                    resolution="HD"
                    loading={index === 0 || index === 1 ? 'eager' : 'lazy'}
                  />
                )}
              </div>
            )
          }
          return null
        })}
    </div>
  )
}
