import { AspectRatioSettingsProps } from '@/lib/sanity/types';
import { cn, getAspectRatioString, getAspectRatioStringDesktop } from '@/lib/utils';

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
