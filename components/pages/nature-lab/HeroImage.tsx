import { SanityImage } from '@/components/sanity/SanityImage'
import { SanityImageProps } from '@/lib/sanity/types'
import { cn, getAspectRatioString } from '@/lib/utils'

interface Props {
  imageMobile: SanityImageProps
  imageDesktop: SanityImageProps
}

export function HeroImage({ imageMobile, imageDesktop }: Props) {
  const mobileAspectRatio = getAspectRatioString('4:3')
  const desktopAspectRatio = getAspectRatioString('21:9')

  return (
    <div className="mt-6">
      <div className={cn('relative lg:hidden', mobileAspectRatio)}>
        {imageMobile && <SanityImage image={imageMobile} fill sizes="95vw" />}
      </div>
      <div className={cn('relative hidden lg:block', desktopAspectRatio)}>
        {imageDesktop && <SanityImage image={imageDesktop} fill sizes="95vw" />}
      </div>
    </div>
  )
}
