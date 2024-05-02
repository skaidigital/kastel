import { Badge } from '@/components/Badge';
import { TracingBeam } from '@/components/TracingBeam';
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
        <div className="flex flex-col lg:col-span-5 lg:col-start-7">
          {timeline?.map((item) => (
            <TracingBeam key={item.label} className="pl-10">
              <div className="pb-10 lg:pb-20">
                <TimelineItem {...item} />
              </div>
            </TracingBeam>
          ))}
        </div>
      </Container>
    </Section>
  );
};
