'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { useShoePickerContext } from '@/components/shared/PageBuilder/ShoePickerSection/Context';
import { ShoePickerProps } from '@/components/shared/PageBuilder/hooks';

interface Props {
  types: ShoePickerProps['types'];
  activeTypeName: string;
}

export function TypeSelector({ types, activeTypeName }: Props) {
  const { setActiveTypeName } = useShoePickerContext();

  async function handleChange(value: string) {
    // await setActiveTypeName(value);
    setActiveTypeName(value);
  }

  return (
    <Select value={activeTypeName} onValueChange={handleChange}>
      <SelectTrigger className="h-12 w-fit shrink-0 bg-brand-primary px-6 text-overline-md font-bold uppercase text-white lg:mb-2 lg:h-auto lg:py-4 lg:text-[24px] lg:leading-[24px] [&>svg]:lg:size-6">
        <SelectValue>{activeTypeName}</SelectValue>
      </SelectTrigger>
      {/* ? Fixes a bug where it clicks the item below the selected item */}
      <SelectContent ref={(ref) => ref?.addEventListener('touchend', (e) => e.preventDefault())}>
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
