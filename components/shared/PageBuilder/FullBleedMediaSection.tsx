import { AspectRatio } from '@/components/AspectRatio'
import { Media } from '@/components/Media'
import { Section } from '@/components/base/Section'
import { FullBleedMediaSectionProps } from '@/components/shared/PageBuilder/hooks'
import { cn } from '@/lib/utils'

interface PropsWithExtra extends FullBleedMediaSectionProps {
  index: number
  pageId: string
  pageType: string
}

interface Props {
  data: PropsWithExtra
}

export const FullBleedMediaSection = ({ data }: Props) => {
  const {
    title,
    description,
    media,
    aspectRatioSettings,
    textPlacementMobile,
    textPlacementDesktop
  } = data

  const hasAnyContent = title || description ? true : false

  return (
    <Section
      label="fullBleedMediaSection"
      srHeading="Full Bleed Media Section"
      noTopPadding={true}
      noBottomPadding={true}
      hasBottomBorder={false}
      className="relative h-full w-full"
    >
      {aspectRatioSettings && (
        <AspectRatio settings={aspectRatioSettings} className="relative">
          {media && <Media media={media} loading="lazy" sizes="100vw" />}
          <div
            className={cn(
              'absolute z-[2] flex h-full w-full flex-col text-white',
              textPlacementMobile === 'left-top' && 'items-start justify-start text-left',
              textPlacementMobile === 'left-center' && 'items-start justify-center text-left',
              textPlacementMobile === 'left-bottom' && 'items-start justify-end text-left',
              textPlacementMobile === 'center-top' && 'items-center justify-start text-center',
              textPlacementMobile === 'center' && 'items-center justify-center text-center',
              textPlacementMobile === 'center-bottom' && 'items-center justify-end text-center',
              textPlacementDesktop === 'left-top' && 'lg:items-start lg:justify-start lg:text-left',
              textPlacementDesktop === 'left-center' &&
                'lg:items-start lg:justify-center lg:text-left',
              textPlacementDesktop === 'left-bottom' &&
                'lg:items-start lg:justify-end lg:text-left',
              textPlacementDesktop === 'center-top' &&
                'lg:items-center lg:justify-start lg:text-center',
              textPlacementDesktop === 'center' &&
                'lg:items-center lg:justify-center lg:text-center',
              textPlacementDesktop === 'center-bottom' &&
                'lg:items-center lg:justify-end lg:text-center',
              textPlacementDesktop === 'split-bottom' && 'lg:w-full lg:justify-end'
            )}
          >
            <div
              className={cn(
                'flex flex-col gap-4 p-6 lg:w-fit lg:gap-6 lg:p-8',
                textPlacementDesktop === 'split-bottom' &&
                  'lg:w-full lg:flex-row lg:justify-between'
              )}
            >
              {title && (
                <h2
                  className={cn(
                    'text-pretty text-heading-lg font-bold uppercase text-white lg:max-w-[750px] lg:text-heading-xl',
                    textPlacementDesktop === 'split-bottom' && 'lg:text-left'
                  )}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  className={cn(
                    'text-md text-brand-light-grey lg:max-w-[580px] lg:text-lg',
                    textPlacementDesktop === 'split-bottom' && 'lg:text-left'
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </AspectRatio>
      )}
      {hasAnyContent && <div className="absolute left-0 top-0 z-[1] h-full w-full bg-black/30" />}
    </Section>
  )
}
