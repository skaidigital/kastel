'use client';

import { Drawer } from '@/components/Drawer';
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
        <Drawer.Trigger>
          <button className="w-full">
            <div className="flex w-full items-center justify-between py-[10px]">
              <Text as="p" size="xs" className=" text-brand-dark-grey">
                Frequently asked questions
              </Text>
              <span>+</span>
            </div>
          </button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>Frequently asked questions</Drawer.Header>
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
        </Drawer.Content>
      </Drawer>
    </div>
  );
}
