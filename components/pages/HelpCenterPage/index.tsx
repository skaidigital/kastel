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
import {
  HelpCenterPagePayload,
  getHelpCenterPageQuery,
  helpCenterPageValidator
} from '@/components/pages/HelpCenterPage/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { portableTextSerializer } from '@/lib/sanity/portableTextSerializer';
import { loadQuery } from '@/lib/sanity/store';
import { cn } from '@/lib/utils';
import { PortableText } from 'next-sanity';
import { draftMode } from 'next/headers';

async function loadHelpCenterPage(lang: LangValues) {
  const query = getHelpCenterPageQuery(lang);

  return loadQuery<HelpCenterPagePayload>(query, {}, { next: { tags: [CACHE_TAGS.HELP_CENTER] } });
}

interface Props {
  lang: LangValues;
}

export async function HelpCenterPage({ lang }: Props) {
  const initial = await loadHelpCenterPage(lang);

  const isDraftMode = draftMode().isEnabled;

  const withoutNullValues = nullToUndefined(initial.data) as HelpCenterPagePayload;
  let validatedData;

  if (!isDraftMode) {
    validatedData = helpCenterPageValidator.safeParse(withoutNullValues);
  }

  const page = isDraftMode ? withoutNullValues : validatedData?.data;

  if (!page) {
    return null;
  }

  return (
    <Container className="mb-20 mt-6 lg:mt-10 lg:grid lg:grid-cols-12">
      <div className="lg:col-span-10 lg:col-start-2 lg:grid">
        <div className="lg:col mb-20 mt-10 lg:mb-40 lg:mt-20 lg:grid lg:grid-cols-10">
          {page.title && (
            <Heading as="h1" size="md" className="lg:col-span-4 lg:mt-2">
              {page.title}
            </Heading>
          )}
          {page.description && (
            <Text className="mt-3 max-w-xl text-balance lg:col-span-5 lg:col-start-6">
              {page.description}
            </Text>
          )}
        </div>
        <Section
          label="faqBlocks"
          srHeading="FAQs"
          size="sm"
          noTopPadding
          hasBottomBorder={false}
          className="grid gap-y-20"
        >
          {page?.faqBlocks.map((block) => (
            <div
              key={block.title}
              className="flex flex-col gap-y-3 lg:grid lg:grid-cols-12 lg:justify-between lg:gap-y-0"
            >
              <Header
                title={block.title}
                description={block.description}
                badge={block.badge}
                className="lg:col-span-5"
              />
              <Accordion
                collapsible
                type="single"
                defaultValue={block.items?.at(0)?.question || undefined}
                className="lg:col-span-5 lg:col-start-7"
              >
                {block.items?.map((item) => (
                  <AccordionItem
                    value={item.question && item.question}
                    key={item.question && item.question}
                  >
                    {item.question && <AccordionTrigger>{item.question}</AccordionTrigger>}
                    <AccordionContent>
                      {item.answer && (
                        <PortableText value={item.answer} components={portableTextSerializer} />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </Section>
      </div>
    </Container>
  );
}

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
