'use client';

import { Dictionary } from '@/app/dictionaries';
import { SizeGuideProps } from '@/lib/sanity/types';
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '../Drawer';
import { Text } from '../base/Text';

interface Props {
  sizeGuide: SizeGuideProps;
  sizeGuideText: Dictionary['product_page']['size_guide'];
}

export function SizeGuide({ sizeGuide, sizeGuideText }: Props) {
  const chart = sizeGuide?.chart;
  const description = sizeGuide?.description;

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
        <DrawerHeader title={sizeGuideText} />
        {description && <span>{description}</span>}
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-200 bg-white">
            {chart?.rows?.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`cell-${cellIndex}`}
                    className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </DrawerContent>
    </Drawer>
  );
}
