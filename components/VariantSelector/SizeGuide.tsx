'use client';

import { Dictionary } from '@/app/dictionaries';
import { Drawer } from '../Drawer';
import { Text } from '../base/Text';

interface Props {
  sizeGuideText: Dictionary['product_page']['size_guide'];
}

export function SizeGuide({ sizeGuideText }: Props) {
  return (
    <Drawer>
      <Drawer.Trigger>
        <button>
          <Text as="p" size="xs" className="text-brand-dark-grey underline">
            {sizeGuideText}
          </Text>
        </button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>{sizeGuideText}</Drawer.Header>
        <div className="p-5">
          <Text as="p" size="sm" className="text-brand-dark-grey">
            Size guide content
          </Text>
        </div>
      </Drawer.Content>
    </Drawer>
  );
}
