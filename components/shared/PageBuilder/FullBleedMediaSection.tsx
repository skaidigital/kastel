import { AspectRatio } from '@/components/AspectRatio';
import { Media } from '@/components/Media';
import { Section } from '@/components/base/Section';
import { FullBleedMediaSectionProps } from '@/components/shared/PageBuilder/hooks';
import { cn } from '@/lib/utils';

interface PropsWithExtra extends FullBleedMediaSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

// TODO: Fix overlay
export const FullBleedMediaSection = ({ data }: Props) => {
  const {
    index,
    pageId,
    pageType,
    title,
    description,
    media,
    aspectRatioSettings,
    textPlacementMobile,
    textPlacementDesktop
  } = data;

  const hasAnyContent = title || description ? true : false;

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
          {media && <Media media={media} loading="lazy" />}
          <div
            className={cn(
              'absolute z-30 h-fit w-fit',
              // textPlacementMobile === 'left-top' && 'left-0 top-0',
              // textPlacementMobile === 'left-center' && 'left-0 top-1/2 -translate-y-1/2 transform',
              // textPlacementMobile === 'left-bottom' && 'bottom-0 left-0',
              // textPlacementMobile === 'center-top' && 'left-1/2 top-0 -translate-x-1/2 transform',
              // textPlacementMobile === 'center' &&
              //   'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center',
              // textPlacementMobile === 'center-bottom' &&
              //   'bottom-0 left-1/2 -translate-x-1/2 transform',
              textPlacementDesktop === 'left-top' && 'lg:left-0 lg:top-0',
              textPlacementDesktop === 'left-center' &&
                'lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:transform',
              // textPlacementDesktop === 'left-bottom' && 'lg:bottom-0 lg:left-0 lg:transform'
              textPlacementDesktop === 'center-top' &&
                'lg:left-1/2 lg:top-0 lg:-translate-x-1/2 lg:transform lg:text-center',
              textPlacementDesktop === 'center' &&
                'lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:text-center'
              // textPlacementDesktop === 'center-bottom' &&
              //   'lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:transform lg:text-center'
              // textPlacementDesktop === 'split-bottom' && ''
            )}
          >
            <div
              className={cn(
                'flex flex-col gap-4 p-6 lg:max-w-3xl lg:gap-6 lg:p-8',
                textPlacementDesktop === 'split-bottom' &&
                  'lg:w-full lg:max-w-none lg:flex-row lg:justify-between'
              )}
            >
              {title && (
                <h2 className="text-heading-lg font-bold uppercase text-white lg:max-w-xl lg:text-heading-xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-md text-brand-light-grey lg:max-w-xl lg:text-lg">
                  {description}
                </p>
              )}
            </div>
          </div>
        </AspectRatio>
      )}
      {/* <div
          className={cn(
            'z-30 flex h-full w-full grow flex-col p-5 text-white lg:p-10',
            textPlacementMobile === 'left-top' && 'items-start justify-start text-left',
            textPlacementMobile === 'center-top' && 'items-center justify-start text-center',
            textPlacementMobile === 'top-right' && 'items-end justify-start text-right',
            textPlacementMobile === 'center-left' && 'items-start justify-center',
            textPlacementMobile === 'center' && 'items-center justify-center text-center',
            textPlacementMobile === 'center-right' && 'items-end justify-center text-right',
            textPlacementMobile === 'bottom-left' && 'items-start justify-end',
            textPlacementMobile === 'bottom-center' && 'items-center justify-end text-center',
            textPlacementMobile === 'bottom-right' && 'items-end justify-end text-right',
            textPositionDesktop === 'top-left' && 'lg:items-start lg:justify-start lg:text-left',
            textPositionDesktop === 'top-center' &&
              'lg:items-center lg:justify-start lg:text-center',
            textPositionDesktop === 'top-right' && 'lg:items-end lg:justify-start lg:text-right',
            textPositionDesktop === 'center-left' &&
              'lg:items-start lg:justify-center lg:text-left',
            textPositionDesktop === 'center' && 'lg:items-center lg:justify-center lg:text-center',
            textPositionDesktop === 'center-right' &&
              'lg:items-end lg:justify-center lg:text-right',
            textPositionDesktop === 'bottom-left' && 'lg:items-start lg:justify-end lg:text-left',
            textPositionDesktop === 'bottom-center' &&
              'lg:items-center lg:justify-end lg:text-center',
            textPositionDesktop === 'bottom-right' && 'lg:items-end lg:justify-end lg:text-right',
            textPositionDesktop === 'split-top' && ''
          )}
        >
          {hasAnyContent && <div className="absolute z-20 h-full w-full bg-black/20" />}
          {title && (
            <h2 className="text-heading-lg font-bold uppercase text-white lg:text-heading-xl">
              {title}
            </h2>
          )}
          {description && <p className="text-md text-brand-light-grey lg:text-lg">{description}</p>}
        </div> */}
      {hasAnyContent && <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/30" />}
    </Section>
  );
};
