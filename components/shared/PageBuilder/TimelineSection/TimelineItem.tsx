import { AspectRatio } from '@/components/AspectRatio'
import { Media } from '@/components/Media'
import { TimelineItemProps } from '@/components/shared/PageBuilder/hooks'

export function TimelineItem({
  title,
  label,
  description,
  media,
  aspectRatioSettings
}: TimelineItemProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col">
        {label && <span className="mb-3 text-heading-md font-bold uppercase">{label}</span>}
        {title && <h3 className="text-balance text-heading-xs font-bold uppercase">{title}</h3>}
      </div>
      {description && <p className="text-md text-brand-mid-grey">{description}</p>}
      {media && aspectRatioSettings && (
        <AspectRatio settings={aspectRatioSettings}>
          <Media media={media} loading="lazy" />
        </AspectRatio>
      )}
    </div>
  )
}
