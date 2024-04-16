import { Accordion, AccordionItem } from '@/components/Accordion';
import { Badge } from '@/components/Badge';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { FAQSectionProps } from '@/components/shared/PageBuilder/hooks';

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
      <Container className="flex max-w-[1200px] flex-col gap-y-3 lg:flex-row lg:justify-between lg:gap-y-0">
        <Header title={title} description={description} badge={badge} />
        <Accordion>
          {items?.map((item) => (
            <AccordionItem key={item.question} title={item.question}>
              <PortableTextRenderer value={item.answer} />
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
}

function Header({ title, description, badge }: HeaderProps) {
  return (
    <div className="group max-w-md">
      <div className="flex flex-col pr-5">
        {badge && <Badge className="mb-2">{badge}</Badge>}
        {title && <Heading size="sm">{title}</Heading>}
        {description && <Text className="mt-4 font-medium text-brand-mid-grey">{description}</Text>}
      </div>
    </div>
  );
}
