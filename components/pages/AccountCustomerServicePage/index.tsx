import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion';
import { Badge } from '@/components/Badge';
import { AccountPageHeader } from '@/components/account/AccountPageHeader';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import {
  CustomerServicePagePayload,
  customerServicePageValidator,
  getCustomerServicePageQuery
} from '@/components/pages/AccountCustomerServicePage/hooks';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { cn } from '@/lib/utils';

async function loadCustomerServicePage(lang: LangValues) {
  const query = getCustomerServicePageQuery(lang);

  return loadQuery<CustomerServicePagePayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.HELP_CENTER] } }
  );
}

interface Props {
  lang: LangValues;
}

export async function AccountCustomerServicePage({ lang }: Props) {
  const initial = await loadCustomerServicePage(lang);

  const withoutNullValues = nullToUndefined(initial.data);
  const validatedData = customerServicePageValidator.safeParse(withoutNullValues);

  if (!validatedData.success) {
    console.log(validatedData.error.errors);

    throw new Error('Failed to validate customer service page data');
  }

  const page = validatedData.data;

  return (
    <div className="grid lg:col-span-9">
      <AccountPageHeader pageTitle={page.title} description={page.description} />
      <Section
        label="faqBlocks"
        srHeading="FAQs"
        size="sm"
        hasBottomBorder={false}
        className="grid gap-y-20"
      >
        {page.faqBlocks.map((block) => (
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
            <Accordion collapsible type="single" className="lg:col-span-5 lg:col-start-7">
              {block.items?.map((item) => (
                <AccordionItem value={item.question} key={item.question}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <PortableTextRenderer value={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </Section>
    </div>
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
