import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
import { ColorFilter } from './ColorFilter';
import { TextFilter } from './TextFilter';
import {
  FilterColorSchema,
  FilterGroupSchema,
  FilterItemValidator,
  FilterTextSchema,
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

export async function FilterItem({ item: filterGroup, open }: FilterItemProps) {
  console.log(filterGroup);
  console.log(open);
  const market = await getMarket();
  const initial = await loadFilterItem(market, filterGroup.type as filterType, filterGroup.id);

  const filterGroupResponse = initial?.data;
  console.log(filterGroupResponse);

  const filterGroups = FilterItemValidator.parse(filterGroupResponse);

  console.log(initial);
  console.log(filterGroups);
  return (
    <>
      <p>{filterGroup.title}</p>
      {filterGroup.type === 'text' &&
        filterGroups.map((filter: FilterTextSchema) => (
          <TextFilter key={filter.id} filter={filter} parentKey={filterGroup.slug} />
        ))}
      {filterGroup.type === 'color' &&
        filterGroups.map((filter: FilterColorSchema) => (
          <ColorFilter key={filter.id} filter={filter} parentKey={filterGroup.slug} />
        ))}
      {filterGroup.type === 'size' && initial.data[0].title}
    </>
  );
}
