import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { StoreLocatorPayload } from '@/components/pages/StoreLocatorPage/hooks';
import { FindAStorePage } from '@/components/stockist-nextjs-page';
import { EncodeDataAttributeCallback } from '@sanity/react-loader';

interface Props {
  data: StoreLocatorPayload;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function StoreLocatorLayout({ data, encodeDataAttribute }: Props) {
  const { title } = data;

  return (
    <Section label="store-locator" srHeading="Store Locator">
      <Container className="flex w-full flex-col items-center gap-y-10">
        <Heading size="lg" data-sanity={encodeDataAttribute?.(['storeLocator', 'title'])}>
          {title}
        </Heading>
        <div className="w-full">
          <FindAStorePage />
        </div>
      </Container>
    </Section>
  );
}
