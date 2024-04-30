import { SanityImage } from '@/components/sanity/SanityImage';
import { SanityLink } from '@/components/sanity/SanityLink';
import { NatureLabInnovationSectionProps } from '@/components/shared/PageBuilder/hooks';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

interface Props {
  item: NatureLabInnovationSectionProps['innovations'][0];
}

export function NatureLabInnovationItem({ item }: Props) {
  return (
    <article className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-6">
        <div className="aspect-h-1 aspect-w-1 relative">
          {item.image && <SanityImage image={item.image} fill className="absolute" />}
        </div>
        {item.title && (
          <h3 className="font-nature-lab-heading text-nature-lab-heading-sm uppercase">
            {item.title}
          </h3>
        )}
        {item.description && (
          <p className="max-w-sm text-balance text-nature-lab-md text-brand-mid-grey">
            {item.description}
          </p>
        )}
      </div>
      <ul className="flex flex-col gap-y-3">
        {item.keyFeatures &&
          item.keyFeatures.map((feature) => (
            <li className="text-nature-lab-sm" key={feature}>
              {feature}
            </li>
          ))}
      </ul>
      {item.link && (
        <SanityLink
          link={item.link}
          className="group flex items-center gap-x-1 text-nature-lab-md font-medium "
        >
          {item.link.text && <span className="group-hover:mr-1">{item.link.text}</span>}
          <ArrowUpRightIcon className="size-3" />
        </SanityLink>
      )}
    </article>
  );
}
