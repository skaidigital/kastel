import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion';
import { Badge } from '@/components/Badge';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { FAQSectionProps } from '@/components/shared/PageBuilder/hooks';
import { cn } from '@/lib/utils';

interface PropsWithExtra extends FAQSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const FAQSection = ({ data }: Props) => {
  const { index, pageId, pageType, title, description, badge, items, sectionSettings } = data;

  return (
    <Section
      label="blogPostSection"
      srHeading={`Section of blog posts`}
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
    >
      <Container className="flex flex-col gap-y-3 lg:grid lg:grid-cols-12 lg:justify-between lg:gap-y-0">
        <Header
          title={title}
          description={description}
          badge={badge}
          className="lg:col-span-4 lg:col-start-2"
        />
        <Accordion collapsible type="single" className="lg:col-span-5 lg:col-start-7">
          {items?.map((item) => (
            <AccordionItem value={item.question} key={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <PortableTextRenderer value={item.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
};

interface HeaderProps {
  title: string;
  description?: string;
  badge?: string;
  className?: string;
}

function Header({ title, description, badge, className }: HeaderProps) {
  return (
    <div className={cn('group max-w-md', className)}>
      <div className="flex flex-col pr-5">
        {badge && <Badge className="mb-2">{badge}</Badge>}
        {title && <Heading size="sm">{title}</Heading>}
        {description && <Text className="mt-4 font-medium text-brand-mid-grey">{description}</Text>}
      </div>
    </div>
  );
}
