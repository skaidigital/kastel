import { NatureLabInnovationSectionProps } from '@/components/shared/PageBuilder/hooks';

interface Props {
  item: NatureLabInnovationSectionProps['innovations'][0];
}

export function NatureLabInnovationItem({ item }: Props) {
  return (
    <article className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-6">
        <span>image</span>
        <span>title</span>
        <span>description</span>
      </div>
      <div className="flex flex-col gap-y-3">
        <span>item1</span>
        <span>item2</span>
        <span>item3</span>
      </div>
      <span>CTA</span>
    </article>
  );
}
