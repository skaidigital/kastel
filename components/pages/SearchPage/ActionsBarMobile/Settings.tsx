'use client';

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/Sheet';
import { Text } from '@/components/base/Text';
import { LangValues } from '@/data/constants';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';

const VIEW_OPTIONS = [
  { label: '1', value: '1' },
  { label: '2', value: '2' }
];

interface Props {
  lang: LangValues;
}

/**
 * Settings for mobile actions bar on search and collection page
 */
export function SearchActionsBarSettings({ lang }: Props) {
  const router = useRouter();

  const [activeViewNumber, setActiveViewNumber] = useQueryState('view', parseAsInteger);

  function handleOnClick(number: number) {
    setActiveViewNumber(number).then(() => router.refresh());
  }

  const viewValue = activeViewNumber || VIEW_OPTIONS[0]?.value;

  const settingsString = getSettingsString(lang);
  const viewString = getViewString(lang);

  return (
    <Sheet>
      <Text size="sm" asChild className="font-medium">
        <SheetTrigger className="flex flex-1 items-center justify-center bg-white py-4">
          {settingsString}
        </SheetTrigger>
      </Text>
      <SheetContent>
        <SheetHeader title={settingsString} />
        <div className="flex flex-col gap-y-3">
          <h3 className="text-sm font-medium">{viewString}</h3>
          <div className="flex gap-x-1">
            {VIEW_OPTIONS.map((option) => {
              const isActive = Number(option.value) === viewValue;

              return (
                <Text
                  key={option.value}
                  size="sm"
                  asChild
                  className={cn(
                    'flex flex-1 items-center justify-center gap-x-2 rounded-[2px] border py-4 font-medium',
                    isActive
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-brand-light-grey bg-brand-sand'
                  )}
                >
                  <label htmlFor={option.value}>
                    {option.label}
                    <input
                      className="hidden"
                      type="radio"
                      name="view"
                      value={option.value}
                      id={option.value}
                      onClick={() => handleOnClick(Number(option.value))}
                    />
                  </label>
                </Text>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function getSettingsString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Settings';
    case 'no':
      return 'Innstillinger';
    default:
      return 'Settings';
  }
}

function getViewString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'View';
    case 'no':
      return 'Vis';
    default:
      return 'View';
  }
}
