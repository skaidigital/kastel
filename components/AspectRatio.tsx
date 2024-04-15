import { AspectRatioSettingsProps, AspectRatios } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  settings: AspectRatioSettingsProps;
  className?: string;
}

export function AspectRatio({ children, settings, className }: Props) {
  const { sameAspectRatio } = settings;

  return (
    <div
      className={cn(
        'h-0 w-full',
        sameAspectRatio && getAspectRatioString(settings.aspectRatio),
        !sameAspectRatio && getAspectRatioString(settings.aspectRatioMobile),
        !sameAspectRatio && getAspectRatioStringDesktop(settings.aspectRatioDesktop),
        className
      )}
    >
      {children}
    </div>
  );
}

function getAspectRatioString(ratio: AspectRatios) {
  switch (ratio) {
    case '16:9':
      return 'aspect-w-16 aspect-h-9';
    case '4:3':
      return 'aspect-w-4 aspect-h-3';
    case '21:9':
      return 'aspect-w-[21] aspect-h-9';
    case '9:16':
      return 'aspect-w-9 aspect-h-16';
    case '3:4':
      return 'aspect-w-3 aspect-h-4';
    default:
      return 'aspect-w-16 aspect-h-9';
  }
}

function getAspectRatioStringDesktop(ratio: AspectRatios) {
  switch (ratio) {
    case '16:9':
      return 'lg:aspect-w-16 lg:aspect-h-9';
    case '4:3':
      return 'lg:aspect-w-4 lg:aspect-h-3';
    case '21:9':
      return 'lg:aspect-w-[21] lg:aspect-h-9';
    case '9:16':
      return 'lg:aspect-w-9 lg:aspect-h-16';
    case '3:4':
      return 'lg:aspect-w-3 lg:aspect-h-4';
    default:
      return 'lg:aspect-w-16 lg:aspect-h-9';
  }
}
