'use server';

import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
import { FilterItem } from './FilterItem';
import { FilterLayout } from './FilterLayout';
import { FilterGroupsValidator, getFilterQuery } from './hooks';

// todo: find a filter tag that revalidates easily

function loadFilter(market: MarketValues) {
  const query = getFilterQuery(market);

  return loadQuery<any>(query, {}, { next: { tags: ['filter'] } });
}

export async function Filter() {
  const market = await getMarket();
  const initial = await loadFilter(market);

  const filterGroupResponse = initial?.data?.items;

  const filterGroup = FilterGroupsValidator.parse(filterGroupResponse);
  console.log(filterGroup);

  return (
    <FilterLayout>
      {filterGroup.map((item, index: number) => (
        <FilterItem key={item.id} item={item} open={index === 0 || index === 1} />
      ))}
    </FilterLayout>
  );
}
