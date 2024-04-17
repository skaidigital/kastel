import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
import { ColorFilter } from './ColorFilter';
import { SizeFilter } from './SizeFilter';
import { TextFilter } from './TextFilter';
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
  open: boolean;
}

export async function FilterGroupItem({ item: filterGroup, open }: FilterItemProps) {
  const market = await getMarket();
  const initial = await loadFilterItem(market, filterGroup.type as filterType, filterGroup.id);

  const filterGroupResponse = initial?.data;

  const filterGroups = FilterItemsValidator.parse(filterGroupResponse);

  return (
    <>
      <p>{filterGroup.title}</p>
      {filterGroup.type === 'text' &&
        filterGroups.map((filter: FilterItemSchema) => (
          <TextFilter key={filter.id} filter={filter} parentKey={filterGroup.slug} />
        ))}
      {filterGroup.type === 'color' &&
        filterGroups.map((filter: FilterItemSchema) => (
          <ColorFilter key={filter.id} filter={filter} parentKey={filterGroup.slug} />
        ))}
      {filterGroup.type === 'size' &&
        filterGroups.map((filter: FilterItemSchema) => (
          <SizeFilter key={filter.id} filter={filter} parentKey={filterGroup.slug} />
        ))}
    </>
  );
}
