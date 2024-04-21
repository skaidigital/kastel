import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion';
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/Drawer';
import { Text } from '@/components/base/Text';
import { FilterGroupItem } from '@/components/pages/CollectionPage/filter/FilterGroupItem';
import { FilterLayout } from '@/components/pages/CollectionPage/filter/FilterLayout';
import {
  filterGroupsValidator,
  getFilterQuery
} from '@/components/pages/CollectionPage/filter/hooks';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
import { PlusIcon } from '@radix-ui/react-icons';

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

  // Get the id of the first two filter group.s Remove undefined values
  const defaultOpen = filterGroup
    .slice(0, 2)
    .map((item) => item.id)
    .filter((item) => item !== undefined);

  return (
    <Drawer>
      <Text size="md" asChild>
        <DrawerTrigger>
          <button className="flex items-center gap-x-2">
            Filter
            <PlusIcon className="size-4" />
          </button>
        </DrawerTrigger>
      </Text>
      <DrawerContent placement="left">
        <DrawerHeader>Filter</DrawerHeader>
        <div className="flex flex-col gap-y-8 px-6">
          <FilterLayout filterGroupKeys={filterGroupKeys}>
            <Accordion
              defaultValue={defaultOpen}
              type="multiple"
              className="lg:col-span-5 lg:col-start-7"
            >
              {filterGroup.map((item, index) => (
                <AccordionItem value={item.id} key={item.id} className="border-none lg:py-4">
                  <AccordionTrigger className="mb-4">{item.title}</AccordionTrigger>
                  <AccordionContent>
                    <FilterGroupItem item={item} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FilterLayout>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
