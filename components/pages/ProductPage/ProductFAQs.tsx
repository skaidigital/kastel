'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion'
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/Drawer'
import { Text } from '@/components/base/Text'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { LangValues } from '@/data/constants'
import { cn } from '@/lib/utils'
import { PortableTextBlock } from '@portabletext/react'
import { PlusIcon } from '@radix-ui/react-icons'

interface Props {
  faqs: {
    question: string
    answer: PortableTextBlock[]
  }[]
  lang: LangValues
  type: 'normal' | 'natureLab'
}

export function ProductFAQs({ faqs, lang, type }: Props) {
  const faqString = getFaqString(lang)

  return (
    <div className="my-8 lg:my-6">
      <Drawer>
        <DrawerTrigger>
          <button className="w-full">
            <div className="flex w-full items-center justify-between py-[10px]">
              <Text
                as="p"
                size="xs"
                className={cn(
                  'font-medium',
                  type === 'natureLab' && 'font-nature-lab-body text-nature-lab-md'
                )}
              >
                {faqString}
              </Text>
              <PlusIcon className="size-4" />
            </div>
          </button>
        </DrawerTrigger>
        <DrawerContent className="lg:max-w-[--drawer-width-lg]">
          <DrawerHeader
            title="Frequently Asked Questions"
            description="Answers to common questions about the product"
          />
          <Accordion
            type="single"
            collapsible
            defaultValue={faqs?.at(0)?.question || ''}
            className="px-6 py-4"
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <PortableTextRenderer value={faq.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

function getFaqString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Frequently asked questions'
    case 'no':
      return 'Ofte stilte spørsmål'
    default:
      return 'Frequently asked questions'
  }
}
