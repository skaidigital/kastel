'use client';

import { Dictionary } from '@/app/dictionaries';
import { Drawer, DrawerContent, DrawerTrigger } from '../Drawer';
import { Text } from '../base/Text';

interface Props {
  sizeGuideText: Dictionary['product_page']['size_guide'];
}

export function SizeGuide({ sizeGuideText }: Props) {
  return (
    <Drawer>
      <DrawerTrigger>
        <button>
          <Text as="p" size="xs" className="text-brand-dark-grey underline">
            {sizeGuideText}
          </Text>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <p>{sizeGuideText}</p>
        <div className="p-5">
          <Text as="p" size="sm" className="text-brand-dark-grey">
            Size guide content
          </Text>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
