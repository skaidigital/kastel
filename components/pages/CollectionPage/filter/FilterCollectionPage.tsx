import { URL_STATE_KEYS } from '@/data/constants';
import { ActiveFilter } from './ActiveFilter';

interface Props {
  searchParams?: {
    [key: string]: string | undefined;
  };
}

export function ActiveFiltersCollectionPage({ searchParams }: Props) {
  const keys = Object.keys(searchParams || {});
  // remove keys that are not filters
  const filteredKeys = keys.filter((key) => !Object.values(URL_STATE_KEYS).includes(key));

  return (
    <div className="flex items-center gap-x-1 ">
      {filteredKeys &&
        filteredKeys.map((key) => {
          if (!searchParams || !searchParams[key]) return null;
          return <ActiveFilter key={key} parentKey={key} />;
        })}
    </div>
  );
}
