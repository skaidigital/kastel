import { Dictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { Text } from '@/components/base/Text';
import { Filter } from '@/components/pages/CollectionPage/CollectionSettingsBarDesktop/Filter';
import { cn } from '@/lib/utils';
import { ActiveFilters } from '../filter/ActiveFilters';
import { ProductsPerRowSelector } from './ProductsPerRowSelector';
import { Sort } from './Sort';

interface Props {
  numberOfProducts: number;
  searchParams?: {
    [key: string]: string | undefined;
  };
  dictionary: Dictionary['collection_page'];
  className?: string;
}

export function CollectionSettingsBarDesktop({
  searchParams,
  numberOfProducts,
  dictionary,
  className
}: Props) {
  return (
    <Container className={cn('flex flex-col space-y-2 pb-8 lg:pb-6', className)}>
      <Row className="items-end">
        <Filter />
        <div className="flex space-x-10">
          <ProductsPerRowSelector />
          <Sort />
        </div>
      </Row>
      <Row>
        <ActiveFilters searchParams={searchParams} />
        <Text size="xs" className="text-brand-mid-grey">
          {numberOfProducts} {dictionary.number_of_products}
        </Text>
      </Row>
    </Container>
  );
}

export function Row({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex w-full justify-between', className)}>{children}</div>;
}
