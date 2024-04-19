import { Dictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { cn } from '@/lib/utils';
import { SortDropdown } from './SortDrowpdown';
import { ViewProductNumberLayout } from './ViewProductNumber';
import { ActiveFiltersCollectionPage } from './filter/FilterCollectionPage';
import { FilterCollectionPageButton } from './filter/FilterCollectionPageButton';

interface Props {
  numberOfProducts: number;
  searchParams?: {
    [key: string]: string | undefined;
  };
  dictionary: Dictionary['collection_page'];
}

export function CollectionSettingsBar({ searchParams, numberOfProducts, dictionary }: Props) {
  return (
    <Container className="flex flex-col space-y-2 pb-8 lg:pb-6">
      <SettingsRow className="items-end">
        <FilterCollectionPageButton />
        <div className="flex space-x-10">
          <ViewProductNumberLayout />
          <SortDropdown />
        </div>
      </SettingsRow>
      <SettingsRow>
        <ActiveFiltersCollectionPage searchParams={searchParams} />
        <p>
          {numberOfProducts} {dictionary.number_of_products}
        </p>
      </SettingsRow>
    </Container>
  );
}

function SettingsRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex w-full justify-between', className)}>{children}</div>;
}
