import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/Sheet';
import { Text } from '@/components/base/Text';
import { loadFilter } from '@/components/pages/CollectionPage/CollectionSettingsBarDesktop/Filter';
import { FilterGroupItem } from '@/components/pages/CollectionPage/filter/FilterGroupItem';
import { FilterLayout } from '@/components/pages/CollectionPage/filter/FilterLayout';
import { filterGroupsValidator } from '@/components/pages/CollectionPage/filter/hooks';
import { OnSaleCheckbox } from '@/components/shared/CollectionAndSearchActionsBarMobile/OnSaleCheckbox';
import { LangValues } from '@/data/constants';
import { PlusIcon } from '@radix-ui/react-icons';

interface Props {
  lang: LangValues;
}

export async function Filter({ lang }: Props) {
  const initial = await loadFilter(lang);

  const filterGroupResponse = initial?.data?.items;
  const filterGroup = filterGroupsValidator.parse(filterGroupResponse);

  const filterGroupKeys = filterGroup.map((item) => item.slug);

  const firstThreeFilterGroups = filterGroup.slice(0, 3);
  const restFilterGroups = filterGroup.slice(3);

  const filterString = getFilterString(lang);

  return (
    <Sheet>
      <Text size="sm" asChild className="font-medium">
        <SheetTrigger className="flex flex-1 items-center justify-center bg-white py-4">
          {filterString}
        </SheetTrigger>
      </Text>
      <SheetContent className="">
        <SheetHeader title={filterString} />
        <FilterLayout filterGroupKeys={filterGroupKeys}>
          <div className="flex flex-col gap-y-6">
            {restFilterGroups?.length > 0 && (
              <div className="flex flex-col gap-y-6">
                <OnSaleCheckbox lang={lang} />
                {restFilterGroups?.map((filterGroup) => (
                  <Sheet key={filterGroup.id}>
                    <SheetTrigger className="flex items-center justify-between text-brand-mid-grey">
                      <Text size="sm">{filterGroup.title}</Text>
                      <PlusIcon className="size-4" />
                    </SheetTrigger>
                    <SheetContent overlayClassName="z-50" className="z-50">
                      <SheetHeader title={filterGroup.title} />
                      <FilterGroupItem item={filterGroup} />
                    </SheetContent>
                  </Sheet>
                ))}
              </div>
            )}
            <div className="flex gap-1">
              {firstThreeFilterGroups?.map((filterGroup) => (
                <Sheet key={filterGroup.id}>
                  <SheetTrigger className="flex flex-1 items-center justify-center rounded-[2px] border border-brand-light-grey bg-brand-sand py-3 text-sm font-medium">
                    {filterGroup.title}
                  </SheetTrigger>
                  <SheetContent overlayClassName="z-50" className="z-50">
                    <SheetHeader title={filterGroup.title} />
                    <FilterGroupItem item={filterGroup} />
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </div>
        </FilterLayout>
      </SheetContent>
    </Sheet>
  );
}

function getFilterString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Filter';
    case 'no':
      return 'Filtrer';
    default:
      return 'Filter';
  }
}
