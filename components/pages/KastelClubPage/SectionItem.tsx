import { KastelClubSectionItemProps } from '@/components/pages/KastelClubPage/hooks';

interface Props {
  item: KastelClubSectionItemProps;
}

export function SectionItem({ item }: Props) {
  return (
    <div className="flex h-full flex-col border border-brand-light-grey p-10">
      <span>Icon here</span>
      {item.title && (
        <h3 className="text-balance text-heading-md font-bold uppercase lg:pr-20">{item.title}</h3>
      )}
      {item.description && (
        <p className="mt-3 text-balance text-md text-brand-mid-grey">{item.description}</p>
      )}
    </div>
  );
}
