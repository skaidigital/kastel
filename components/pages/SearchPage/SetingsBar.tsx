import { Container } from '@/components/base/Container';
import { Row } from '@/components/pages/CollectionPage/CollectionSettingsBarDesktop';
import { Filter } from '@/components/pages/CollectionPage/CollectionSettingsBarDesktop/Filter';
import { ActiveFilters } from '@/components/pages/CollectionPage/filter/ActiveFilters';
import { ProductsPerRowSelector } from '@/components/pages/SearchPage/ProductsPerRowSelector';
import { LangValues, MarketValues } from '@/data/constants';
import { cn } from '@/lib/utils';
import { Sort } from '../CollectionPage/CollectionSettingsBarDesktop/Sort';
import { SearchParamsKeysPayload } from '../CollectionPage/hooks';

interface Props {
  searchParams?: {
    [key: string]: string | undefined;
  };
  market: MarketValues;
  lang: LangValues;
  className?: string;
  searchGids?: string[];
  includedSearchParamsKeys: SearchParamsKeysPayload;
}

export function SearchSettingsBar({
  market,
  lang,
  searchParams,
  className,
  searchGids,
  includedSearchParamsKeys
}: Props) {
  return (
    <Container className={cn('flex flex-col space-y-2 pb-8 lg:pb-2', className)}>
      <Row className="items-end">
        <Filter market={market} lang={lang} searchGids={searchGids} />
        <div className="flex space-x-10">
          <ProductsPerRowSelector />
          <Sort lang={lang} />
        </div>
      </Row>
      <Row>
        <ActiveFilters includedSearchParamsKeys={includedSearchParamsKeys} />
      </Row>
    </Container>
  );
}
