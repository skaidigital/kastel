import { ColorFilter } from '@/components/pages/CollectionPage/filter/ColorFilter';
import { SizeFilter } from '@/components/pages/CollectionPage/filter/SizeFilter';
import { TextFilter } from '@/components/pages/CollectionPage/filter/TextFilter';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
import {
  FilterGroupSchema,
  FilterItemSchema,
  FilterItemsValidator,
  getFilterItemQuery
} from './hooks';

type filterType = 'text' | 'color' | 'size';

function loadFilterItem(market: MarketValues, type: filterType, parentId: string) {
  const query = getFilterItemQuery(market, type);

  return loadQuery<any>(query, { parentId }, { next: { tags: ['filter'] } });
}

interface FilterItemProps {
  item: FilterGroupSchema;
}

export async function FilterGroupItem({ item: filterGroup }: FilterItemProps) {
  const market = await getMarket();

  const initial = await loadFilterItem(market, filterGroup.type as filterType, filterGroup.id);

  const filterGroupResponse = initial?.data;

  const filterGroups = FilterItemsValidator.parse(filterGroupResponse);

  return (
    <>
      {filterGroup.type === 'text' && (
        <div className="flex flex-wrap gap-2">
          {filterGroups.map((filter: FilterItemSchema) => (
            <TextFilter key={filter.id} filter={filter} parentKey={filterGroup.slug} />
          ))}
        </div>
      )}
      {filterGroup.type === 'color' && (
        <div className="grid grid-cols-4 gap-x-2 gap-y-3 lg:grid-cols-5 lg:gap-4">
          {filterGroups.map((filter: FilterItemSchema) => (
            <ColorFilter key={filter.id} filter={filter} parentKey={filterGroup.slug} />
          ))}
        </div>
      )}
      {filterGroup.type === 'size' && (
        <div className="grid grid-cols-4 gap-1 lg:gap-4">
          {filterGroups.map((filter: FilterItemSchema) => (
            <SizeFilter key={filter.id} filter={filter} parentKey={filterGroup.slug} />
          ))}
        </div>
      )}
    </>
  );
}
