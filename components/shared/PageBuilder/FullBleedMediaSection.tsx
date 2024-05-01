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
// TODO fix w-fit h-fit making mobile ugly
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
              textPlacementMobile === 'left-top' && 'left-0 top-0',
              textPlacementMobile === 'left-center' && 'left-0 top-1/2 -translate-y-1/2 transform',
              textPlacementMobile === 'left-bottom' && 'left-0 top-0 mt-auto',
              textPlacementMobile === 'center-top' &&
                'left-1/2 top-0 -translate-x-1/2 transform text-center',
              textPlacementMobile === 'center' &&
                'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center',
              textPlacementMobile === 'center-bottom' &&
                'left-1/2 top-0 mt-auto -translate-x-1/2 transform text-center',
              textPlacementDesktop === 'left-top' && 'lg:left-0 lg:top-0',
              textPlacementDesktop === 'left-center' &&
                'lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:transform',
              textPlacementDesktop === 'left-bottom' &&
                'lg:left-0 lg:top-0 lg:mt-auto lg:transform',
              textPlacementDesktop === 'center-top' &&
                'lg:left-1/2 lg:top-0 lg:-translate-x-1/2 lg:transform lg:text-center',
              textPlacementDesktop === 'center' &&
                'lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:text-center',
              textPlacementDesktop === 'center-bottom' &&
                'lg:left-1/2 lg:top-0 lg:mt-auto lg:-translate-x-1/2 lg:transform lg:text-center',
              textPlacementDesktop === 'split-bottom' && 'w-full'
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
                <h2
                  className={cn(
                    'text-heading-lg font-bold uppercase text-white lg:max-w-md lg:text-heading-xl',
                    textPlacementDesktop === 'split-bottom' && 'text-left'
                  )}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  className={cn(
                    'text-md text-brand-light-grey lg:max-w-md lg:text-lg',
                    textPlacementDesktop === 'split-bottom' && 'text-left'
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </AspectRatio>
      )}
      {hasAnyContent && <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/30" />}
    </Section>
  );
};
