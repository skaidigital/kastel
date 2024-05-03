import { SanityImage } from '@/components/sanity/SanityImage';
import { MeetTheTeamSectionProps } from '@/components/shared/PageBuilder/hooks';

interface Props {
  data: MeetTheTeamSectionProps['people'][0];
}

export function TeamMember({ data }: Props) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="aspect-h-1 aspect-w-1 relative">
        {data.image && <SanityImage image={data.image} fill className="absolute" />}
      </div>
      <div className="flex flex-col">
        {data.name && <h3 className="text-md font-bold">{data.name}</h3>}
        {data.role && <span className="mt-0.5 text-sm text-brand-mid-grey">{data.role}</span>}
        {data.description && (
          <span className="mt-3 text-pretty pr-4 text-sm text-brand-mid-grey">
            {data.description}
          </span>
        )}
      </div>
    </div>
  );
}
