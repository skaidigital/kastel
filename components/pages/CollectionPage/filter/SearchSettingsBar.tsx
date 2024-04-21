import { Dictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { Row } from '../CollectionSettingsBarDesktop';
import { Filter } from '../CollectionSettingsBarDesktop/Filter';
import { ProductsPerRowSelector } from '../CollectionSettingsBarDesktop/ProductsPerRowSelector';
import { Sort } from '../CollectionSettingsBarDesktop/Sort';
import { ActiveFilters } from './ActiveFilters';

interface Props {
  numberOfProducts: number;
  searchParams?: {
    [key: string]: string | undefined;
  };
  dictionary: Dictionary['collection_page'];
}

export function SearchSettingsBar({ searchParams, numberOfProducts, dictionary }: Props) {
  return (
    <Container className="flex flex-col space-y-2 pb-8 lg:pb-6">
      <Row className="items-end">
        <Filter />
        <div className="flex space-x-10">
          <ProductsPerRowSelector />
          <Sort />
        </div>
      </Row>
      <Row>
        <ActiveFilters searchParams={searchParams} />
        <p>
          {numberOfProducts} {dictionary.number_of_products}
        </p>
      </Row>
    </Container>
  );
}
