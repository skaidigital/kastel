import { KastelClubSectionItemProps } from '@/components/pages/KastelClubPage/hooks'
import { SanityImage } from '@/components/sanity/SanityImage'

interface Props {
  item: KastelClubSectionItemProps
}

export function SectionItem({ item }: Props) {
  return (
    <div className="flex h-full flex-col border border-brand-light-grey p-10">
      {item.icon && (
        <SanityImage width={80} height={80} image={item.icon} noPlaceholder className="mb-1" />
      )}
      {item.title && (
        <h3 className="text-balance text-heading-md font-bold uppercase lg:pr-20">{item.title}</h3>
      )}
      {item.description && (
        <p className="mt-3 text-balance text-md text-brand-mid-grey">{item.description}</p>
      )}
    </div>
  )
}
