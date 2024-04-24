'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/Drawer';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
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
    <div className="my-8 lg:my-6">
      <Drawer>
        <DrawerTrigger>
          <button className="w-full">
            <div className="flex w-full items-center justify-between py-[10px]">
              <Text as="p" size="xs" className="font-medium">
                Frequently asked questions
              </Text>
              <span>+</span>
            </div>
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <Container className="my-8">
            <Heading as="h1" size="xs" className="font-medium">
              Frequently asked questions
            </Heading>
            <Accordion type="single" collapsible>
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <PortableTextRenderer value={faq.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
