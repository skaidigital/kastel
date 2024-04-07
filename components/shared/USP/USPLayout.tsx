import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { Item } from '@/components/shared/USP/Item';
import { USPPayload } from '@/components/shared/USP/hooks';
import { ChatsCircle, CreditCard, Package } from '@phosphor-icons/react/dist/ssr';
import { EncodeDataAttributeCallback } from '@sanity/react-loader';

interface Props {
  data: USPPayload;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}
export const USPLayout = ({ data, encodeDataAttribute }: Props) => {
  const { items } = data;

  return (
    <Section
      size="sm"
      srHeading="Unique selling proposition"
      label="usp"
      className="border-b border-brand-border bg-brand-light-grey"
    >
      <Container className="grid grid-cols-1 place-items-center gap-y-20 lg:grid-cols-3 lg:gap-y-0">
        {items.at(0) && (
          <Item
            icon={<Package className="h-6 w-6" />}
            title={items.at(0)?.title || ''}
            description={items.at(0)?.subtitle || ''}
          />
        )}
        {items.at(1) && (
          <Item
            icon={<ChatsCircle className="h-6 w-6" />}
            title={items.at(1)?.title || ''}
            description={items.at(1)?.subtitle || ''}
          />
        )}
        {items.at(2) && (
          <Item
            icon={<CreditCard className="h-6 w-6" />}
            title={items.at(2)?.title || ''}
            description={items.at(2)?.subtitle || ''}
          />
        )}
      </Container>
    </Section>
  );
};
