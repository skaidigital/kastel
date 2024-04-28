'use client';

import { Dictionary } from '@/app/dictionaries';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/Sheet';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { SizeGuideProps } from '@/lib/sanity/types';
import { useDeviceType } from '@/lib/useDeviceType';
import { cn } from '@/lib/utils';
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '../Drawer';
import { Text } from '../base/Text';

interface Props {
  sizeGuide: SizeGuideProps;
  sizeGuideText: Dictionary['product_page']['size_guide'];
}

export function SizeGuide({ sizeGuide, sizeGuideText }: Props) {
  const chart = sizeGuide?.chart;
  const description = sizeGuide?.description;

  const { isDesktop } = useDeviceType();

  if (isDesktop) {
    return (
      <Drawer>
        <DrawerTrigger>
          <button>
            <Text as="p" size="xs" className="text-brand-dark-grey underline">
              {sizeGuideText}
            </Text>
          </button>
        </DrawerTrigger>
        <DrawerContent className="max-h-dvh overflow-y-auto lg:max-w-[--drawer-width-lg]">
          <DrawerHeader title={sizeGuideText} />
          {description && (
            <div className="px-6 text-brand-mid-grey">
              <PortableTextRenderer value={description} type="normal" />
            </div>
          )}
          <table className="mt-6  min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200  bg-white">
              {chart?.rows?.map((row, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  className={cn(
                    rowIndex === 0
                      ? 'text-overline-sm font-medium uppercase tracking-widest'
                      : 'text-xs'
                  )}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`cell-${cellIndex}`}
                      className="whitespace-nowrap px-6 py-4 text-brand-mid-grey"
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

  return (
    <Sheet>
      <SheetTrigger>
        <button>
          <Text as="p" size="xs" className="text-brand-dark-grey underline">
            {sizeGuideText}
          </Text>
        </button>
      </SheetTrigger>
      <SheetContent className="flex h-full max-h-[90dvh] flex-col overflow-hidden">
        <SheetHeader title={sizeGuideText}>
          {description && (
            <div className="text-brand-mid-grey">
              <PortableTextRenderer value={description} type="normal" />
            </div>
          )}
        </SheetHeader>
        <div className="flex flex-col overflow-auto">
          <table className="mt-4 min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200 bg-white">
              {chart?.rows?.map((row, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  className={cn(
                    rowIndex === 0
                      ? 'text-overline-sm font-medium uppercase tracking-widest'
                      : 'text-xs'
                  )}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`cell-${cellIndex}`}
                      className="whitespace-nowrap py-4 pr-6 text-brand-mid-grey"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SheetContent>
    </Sheet>
  );
}
