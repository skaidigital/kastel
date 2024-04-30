import { Badge } from '@/components/Badge';
import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { TimelineItem } from '@/components/shared/PageBuilder/TimelineSection/TimelineItem';
import { TimelineSectionProps } from '@/components/shared/PageBuilder/hooks';

interface PropsWithExtra extends TimelineSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const TimelineSection = ({ data }: Props) => {
  const { index, pageId, title, description, badge, sectionSettings, timeline } = data;

  return (
    <Section
      label="timelineSection"
      srHeading="Timeline section"
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
    >
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:col-start-2 xl:col-span-3 xl:col-start-2">
          <div className="flex flex-col lg:sticky lg:top-10 ">
            {badge && <Badge className="mb-2">{badge}</Badge>}
            {title && <h2 className="text-balance text-heading-md font-bold uppercase">{title}</h2>}
            {description && <p className="mt-6 text-sm text-brand-mid-grey">{description}</p>}
          </div>
        </div>
        <div className="flex gap-x-10 lg:col-span-5 lg:col-start-7">
          <div className="h-full w-4 bg-brand-primary" />
          <div className="flex flex-col gap-y-10 lg:gap-y-20">
            {timeline?.map((item) => <TimelineItem {...item} key={item.label} />)}
          </div>
        </div>
      </Container>
    </Section>
  );
};
