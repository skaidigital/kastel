'use client';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/Drawer';
import { Text } from '@/components/base/Text';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { PortableTextBlock } from '@portabletext/react';

interface Props {
  faqs: {
    question: string;
    answer: PortableTextBlock[];
  }[];
}

export function FaqLayout({ faqs }: Props) {
  return (
    <div className="my-4">
      <Drawer>
        <DrawerTrigger>
          <button className="w-full">
            <div className="flex w-full items-center justify-between py-[10px]">
              <Text as="p" size="xs" className=" text-brand-dark-grey">
                Frequently asked questions
              </Text>
              <span>+</span>
            </div>
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <p>Frequently asked questions</p>
          <div className="p-5">
            {faqs.map((faq) => (
              <div key={faq.question} className="">
                <Text as="p" size="sm" className="text-brand-dark-grey">
                  {faq.question}
                </Text>

                <PortableTextRenderer value={faq.answer} />
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
