import { ActiveFilterGroupItem } from '@/components/pages/CollectionPage/filter/ActiveFilterGroupItem';
import { URL_STATE_KEYS } from '@/data/constants';

interface Props {
  searchParams?: {
    [key: string]: string | undefined;
  };
}

export function ActiveFilters({ searchParams }: Props) {
  const keys = Object.keys(searchParams || {});

  // remove keys that are not filters
  const filteredKeys = keys.filter((key) => !Object.values(URL_STATE_KEYS).includes(key));

  return (
    <div className="flex items-center gap-x-1">
      {filteredKeys &&
        filteredKeys.map((key) => {
          if (!searchParams || !searchParams[key]) return null;
          return <ActiveFilterGroupItem key={key} parentKey={key} />;
        })}
    </div>
  );
}
