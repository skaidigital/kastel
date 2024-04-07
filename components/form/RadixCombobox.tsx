import { Label } from '@/components/form/Field';
import countries from '@/data/countries';
import { Combobox, ComboboxItem, ComboboxList, ComboboxProvider } from '@ariakit/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { CheckIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import * as RadixSelect from '@radix-ui/react-select';
import { matchSorter } from 'match-sorter';
import { startTransition, useMemo, useState } from 'react';

interface Props {
  name: string;
  label: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}
export function RadixCombobox({ value, onChange, name, label, defaultValue }: Props) {
  const [open, setOpen] = useState(false);
  //   const [value, setValue] = useState(defaultValue || '');
  const [searchValue, setSearchValue] = useState('');

  const matches = useMemo(() => {
    if (!searchValue) return countries;
    const keys = ['label', 'value'];
    const matches = matchSorter(countries, searchValue, { keys });
    const selectedLanguage = countries.find((lang) => lang.value === value);
    if (selectedLanguage && !matches.includes(selectedLanguage)) {
      matches.push(selectedLanguage);
    }
    return matches;
  }, [searchValue, value]);

  return (
    <div className="flex flex-col gap-y-1">
      {label && <Label>{label}</Label>}
      <RadixSelect.Root
        value={value}
        onValueChange={onChange}
        defaultValue={defaultValue}
        open={open}
        onOpenChange={setOpen}
      >
        <ComboboxProvider
          open={open}
          setOpen={setOpen}
          resetValueOnHide
          includesBaseElement={false}
          setValue={(value) => {
            startTransition(() => {
              setSearchValue(value);
            });
          }}
        >
          <RadixSelect.Trigger
            aria-label="Country"
            className="inline-flex items-center justify-between gap-1 rounded-project border border-brand-border px-2 py-1.5 text-paragraph-sm text-brand-dark-grey"
          >
            <RadixSelect.Value placeholder="Select a language" className="px-2 py-1.5" />
            <RadixSelect.Icon className="translate-x-1">
              <ChevronUpDownIcon className="h-4 w-4" />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>
          <RadixSelect.Content
            role="dialog"
            aria-label="countries"
            position="popper"
            className="z-[50] max-h-[calc(var(--radix-select-content-available-height,_336px))] rounded-project border border-brand-border bg-white"
            sideOffset={4}
            alignOffset={-16}
          >
            <div className="relative flex items-center border-b border-brand-border py-1 pb-0">
              <div className="absolute left-2.5 text-brand-mid-grey">
                <MagnifyingGlassIcon />
              </div>
              <Combobox
                autoSelect
                name={name}
                placeholder="Search countries"
                className="h-10 appearance-none rounded-md bg-white pl-7 pr-2 text-black outline-none focus:outline-none"
                onBlurCapture={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              />
            </div>
            <ComboboxList className="overflow-y-auto p-1">
              {matches.map(({ label, value }) => (
                <RadixSelect.Item
                  key={value}
                  value={value}
                  asChild
                  className="relative flex h-10 cursor-default scroll-m-[0.25rem] items-center rounded-md px-7 text-black outline-none focus:outline-none"
                >
                  <ComboboxItem>
                    <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
                    <RadixSelect.ItemIndicator className="absolute left-1.5">
                      <CheckIcon />
                    </RadixSelect.ItemIndicator>
                  </ComboboxItem>
                </RadixSelect.Item>
              ))}
            </ComboboxList>
          </RadixSelect.Content>
        </ComboboxProvider>
      </RadixSelect.Root>
    </div>
  );
}
