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
import { OnSaleCheckbox } from '@/components/shared/CollectionAndSearchActionsBarMobile/OnSaleCheckbox';
import { LangValues, MarketValues } from '@/data/constants';
import { loadQuery } from '@/lib/sanity/storeServer';
import { PlusIcon } from '@radix-ui/react-icons';

// TODO move into a separate file since it's used in multiple places
export function loadFilter(lang: LangValues) {
  const query = getFilterQuery(lang);

  return loadQuery<any>(query, {}, { next: { tags: ['filters'] } });
}

interface Props {
  market: MarketValues;
  lang: LangValues;
  collectionSlug?: string;
  searchGids?: string[];
}

export async function Filter({ market, lang, collectionSlug, searchGids }: Props) {
  const initial = await loadFilter(lang);

  const filterGroupResponse = initial?.data?.items;
  const filterGroup = filterGroupsValidator.parse(filterGroupResponse);

  const filterGroupKeys = filterGroup.map((item) => item.slug);

  console.log(initial);
  console.log(filterGroupResponse);
  console.log(filterGroup);
  console.log(filterGroupKeys);

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
        <DrawerHeader title={'Filter'} />
        <div className="flex flex-col gap-y-8 px-6">
          <FilterLayout filterGroupKeys={filterGroupKeys}>
            <div>
              <Accordion
                defaultValue={defaultOpen}
                type="multiple"
                className="lg:col-span-5 lg:col-start-7"
              >
                {filterGroup.map((item) => (
                  <AccordionItem value={item.id} key={item.id} className="border-none lg:py-4">
                    <AccordionTrigger className="mb-4 text-md">{item.title}</AccordionTrigger>
                    <AccordionContent>
                      <FilterGroupItem
                        item={item}
                        market={market}
                        collectionSlug={collectionSlug}
                        searchGids={searchGids}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <OnSaleCheckbox
                lang={lang}
                className="cursor-pointer py-4 font-medium text-brand-dark-grey lg:text-md"
              />
            </div>
          </FilterLayout>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
