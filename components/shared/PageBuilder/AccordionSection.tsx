import { Accordion, AccordionItem } from '@/components/Accordion';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { AccordionSectionProps } from '@/components/shared/PageBuilder/hooks';

interface Props {
  data: AccordionSectionProps;
}

export const AccordionSection = ({ data }: Props) => {
  const { title, items, padding, hasTopPadding, hasBottomPadding, hasBottomBorder } = data;

  return (
    <Section
      size={padding}
      noTopPadding={!hasTopPadding}
      noBottomPadding={!hasBottomPadding}
      label="accordion"
      srHeading="Accordion block"
      className={hasBottomBorder ? 'border-b border-brand-border' : ''}
    >
      <Container className="flex flex-col items-center justify-center space-y-5 lg:space-y-10">
        {title && (
          <Heading as="h2" size="md">
            {title}
          </Heading>
        )}
        <div className="w-full max-w-lg">
          {items?.map((item) => (
            <Accordion key={item.title}>
              <AccordionItem title={item.title}>
                {item.richText && <PortableTextRenderer value={item.richText} />}
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </Container>
    </Section>
  );
};
