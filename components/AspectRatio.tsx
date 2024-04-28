import { AspectRatioSettingsProps } from '@/lib/sanity/types';
import { cn, getAspectRatioString, getAspectRatioStringDesktop } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  settings: AspectRatioSettingsProps;
  className?: string;
}

export function AspectRatio({ children, settings, className }: Props) {
  const { sameAspectRatio } = settings;

  const aspectRatioString = sameAspectRatio
    ? getAspectRatioString(settings.aspectRatio)
    : `${getAspectRatioString(settings.aspectRatioMobile)} ${getAspectRatioStringDesktop(settings.aspectRatioDesktop)}`;

  return <div className={cn('h-0 w-full', aspectRatioString, className)}>{children}</div>;
}
