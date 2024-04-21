'use server';

import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
import { FilterGroupItem } from './FilterGroupItem';
import { FilterLayout } from './FilterLayout';
import { filterGroupsValidator, getFilterQuery } from './hooks';

// todo: find a filter tag that revalidates easily
function loadFilter(market: MarketValues) {
  const query = getFilterQuery(market);

  return loadQuery<any>(query, {}, { next: { tags: ['filters'] } });
}

export async function Filter() {
  const market = await getMarket();
  const initial = await loadFilter(market);

  const filterGroupResponse = initial?.data?.items;
  const filterGroup = filterGroupsValidator.parse(filterGroupResponse);

  const filterGroupKeys = filterGroup.map((item) => item.slug);

  return (
    <FilterLayout filterGroupKeys={filterGroupKeys}>
      {filterGroup.map((item, index: number) => (
        <FilterGroupItem key={item.id} item={item} open={index === 0 || index === 1} />
      ))}
    </FilterLayout>
  );
}
