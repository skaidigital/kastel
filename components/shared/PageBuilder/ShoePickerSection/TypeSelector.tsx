'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/form/RadixSelect';
import { setActiveTypeName } from '@/components/shared/PageBuilder/ShoePickerSection/actions';
import { ShoePickerProps } from '@/components/shared/PageBuilder/hooks';

interface Props {
  types: ShoePickerProps['types'];
  activeTypeName: string;
}

export function TypeSelector({ types, activeTypeName }: Props) {
  async function handleChange(value: string) {
    await setActiveTypeName(value);
  }

  return (
    <Select value={activeTypeName} onValueChange={handleChange}>
      <SelectTrigger className="w-fit shrink-0 bg-brand-primary px-6 py-4 text-overline-md font-bold uppercase text-white lg:h-auto lg:text-[24px] lg:leading-[24px] [&>svg]:lg:size-6">
        <SelectValue>{activeTypeName}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {types?.map((type) => (
          <SelectItem
            key={type.title}
            value={type.title}
            className="rounded-none bg-white text-overline-md font-medium uppercase hover:bg-brand-primary hover:text-white focus:bg-brand-primary focus:text-white lg:text-md"
          >
            {type.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}