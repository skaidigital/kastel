'use client';

import { Dictionary } from '@/app/dictionaries';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/Sheet';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';
import { portableTextSerializer } from '@/lib/sanity/portableTextSerializer';
import { SizeGuideProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { PortableText } from 'next-sanity';
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '../Drawer';

interface Props {
  sizeGuide: SizeGuideProps;
  sizeGuideText: Dictionary['product_page']['size_guide'];
}

export function SizeGuide({ sizeGuide, sizeGuideText }: Props) {
  const chart = sizeGuide?.chart;
  const description = sizeGuide?.description;

  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <Drawer>
        <DrawerTrigger className="text-xs text-brand-dark-grey underline" asChild={false}>
          {sizeGuideText}
        </DrawerTrigger>
        <DrawerContent className="max-h-dvh overflow-y-auto lg:max-w-[--drawer-width-lg]">
          <DrawerHeader title={sizeGuideText} description="Size guide for the product page" />
          {description && (
            <div className="noMarginFirstChild px-6 text-brand-mid-grey">
              <PortableText value={description} components={portableTextSerializer} />
            </div>
          )}
          <table className="mt-6 min-w-full divide-y divide-gray-200">
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
      <SheetTrigger className="text-xs text-brand-dark-grey underline">
        {sizeGuideText}
      </SheetTrigger>
      <SheetContent className="flex max-h-[90dvh] flex-col">
        <SheetHeader title={sizeGuideText}></SheetHeader>
        <div className="overflow-y-auto">
          {description && (
            <div className="text-brand-mid-grey">
              <PortableTextRenderer value={description} type="normal" />
            </div>
          )}
          <div className="flex flex-col">
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
