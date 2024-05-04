import { Container } from '@/components/base/Container';
import { Row } from '@/components/pages/CollectionPage/CollectionSettingsBarDesktop';
import { Filter } from '@/components/pages/CollectionPage/CollectionSettingsBarDesktop/Filter';
import { ActiveFilters } from '@/components/pages/CollectionPage/filter/ActiveFilters';
import { LangValues } from '@/data/constants';
import { cn } from '@/lib/utils';
import { ProductsPerRowSelector } from '../CollectionSettingsBarDesktop/ProductsPerRowSelector';
import { Sort } from '../CollectionSettingsBarDesktop/Sort';

interface Props {
  searchParams?: {
    [key: string]: string | undefined;
  };
  lang: LangValues;
  className?: string;
}

export function SearchSettingsBar({ lang, searchParams, className }: Props) {
  return (
    <Container className={cn('flex flex-col space-y-2 pb-8 lg:pb-2', className)}>
      <Row className="items-end">
        <Filter lang={lang} />
        <div className="flex space-x-10">
          <ProductsPerRowSelector />
          <Sort lang={lang} />
        </div>
      </Row>
      <Row>
        <ActiveFilters searchParams={searchParams} />
      </Row>
    </Container>
  );
}
