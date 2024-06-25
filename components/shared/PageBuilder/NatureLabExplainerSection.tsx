'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { Container } from '@/components/base/Container'
import { Section } from '@/components/base/Section'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { SanityImage } from '@/components/sanity/SanityImage'
import { NatureLabExplainerSectionProps } from '@/components/shared/PageBuilder/hooks'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

interface PropsWithExtra extends NatureLabExplainerSectionProps {
  index: number
  pageId: string
  pageType: string
}

interface Props {
  data: PropsWithExtra
}

// TODO consider making the image of type media instead
// TODO download and set all the fonts correctly
// TODO make sure the image doesn't resize and look fucked
export const NatureLabExplainerSection = ({ data }: Props) => {
  const { title, titleTitle, titleContent, steps, sectionSettings } = data

  // TODO figure out why it can be undefined
  const [activeTabTitle, setActiveTabTitle] = useState<string | undefined>(steps[0]?.title)

  return (
    <Section
      label="natureLabExplainerSection"
      srHeading="Explanation of Kastel's sustainability efforts"
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
      className="relative bg-nature-lab-beige"
    >
      <Image
        src="/images/nl-background-texture.png"
        fill
        alt="background texture"
        className="absolute -z-0 h-full w-full object-cover opacity-20"
      />
      <Container className="relative z-10 lg:hidden">
        <div className="mb-4 flex flex-col gap-y-1.5">
          {titleTitle && (
            <span className="font-nature-lab-body text-nature-lab-lg text-brand-mid-grey">
              {titleTitle}:
            </span>
          )}
          {title && (
            <h2 className="font-nature-lab-body text-nature-lab-heading-lg uppercase">{title}</h2>
          )}
        </div>
        <Accordion type="single" defaultValue={steps?.at(0)?.title}>
          {steps?.map((step) => (
            <AccordionItem
              key={step.title}
              value={step.title}
              className="border-b border-nature-lab-dark-grey"
            >
              {step.title && (
                <AccordionTrigger className="font-nature-lab-body text-nature-lab-md uppercase">
                  {step.title}
                </AccordionTrigger>
              )}
              {step.content && (
                <AccordionContent className=" flex flex-col gap-y-10">
                  <div className="mt-6 flex flex-col gap-y-3">
                    {titleContent && (
                      <span className="font-nature-lab-body text-nature-lab-md">
                        {titleContent}:
                      </span>
                    )}
                    <div className="*:mt-0">
                      <PortableTextRenderer value={step.content} />
                    </div>
                  </div>
                  {step.image && (
                    <div className="aspect-h-1 aspect-w-1 h-0 w-full">
                      <SanityImage image={step.image} fill className="absolute" />
                    </div>
                  )}
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
      <div className="relative z-10 hidden lg:block">
        <Tabs
          value={activeTabTitle}
          onValueChange={setActiveTabTitle}
          defaultValue={steps?.at(0)?.title}
        >
          <Container className="mb-3 flex max-w-[1000px] justify-between">
            <div className="mb-4 flex flex-col gap-y-1.5">
              {titleTitle && (
                <span className="font-nature-lab-body text-nature-lab-lg text-brand-mid-grey">
                  {titleTitle}:
                </span>
              )}
              {title && (
                <h2 className="font-nature-lab-heading text-nature-lab-heading-lg uppercase">
                  {title}
                </h2>
              )}
            </div>
            <div className="mb-4 flex flex-col items-end gap-y-1.5">
              {titleTitle && (
                <span className="font-nature-lab-body text-nature-lab-lg text-brand-mid-grey">
                  Subtitle:
                </span>
              )}
              {activeTabTitle && (
                <h2 className="font-nature-lab-heading text-nature-lab-heading-lg uppercase text-red-700">
                  {activeTabTitle}
                </h2>
              )}
            </div>
          </Container>
          <div className="mb-10 border-y border-neutral-300">
            <Container className="max-w-[1000px]">
              <TabsList className="h-fit p-0">
                {steps?.map((step, index) => (
                  <TabsTrigger
                    key={step.title}
                    value={step.title}
                    className={cn(
                      'py-4 font-nature-lab-body text-nature-lab-md uppercase',
                      activeTabTitle === step.title && 'text-brand-primary',
                      index === 0 && 'pl-0'
                    )}
                  >
                    {step.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Container>
          </div>
          {steps?.map((step) => (
            <TabsContent value={step.title} key={step.title}>
              <Container className="max-w-[1000px]">
                <div className="flex gap-x-10">
                  <div className="flex flex-1 flex-col gap-y-3">
                    {titleContent && (
                      <span className="font-nature-lab-body text-nature-lab-md">
                        {titleContent}:
                      </span>
                    )}
                    <div className="*:mt-0">
                      <PortableTextRenderer value={step.content} type="natureLab" />
                    </div>
                  </div>
                  {step.image && (
                    <div className="flex-1">
                      <div className="aspect-h-1 aspect-w-1 h-0 w-full">
                        <SanityImage image={step.image} fill className="absolute" />
                      </div>
                    </div>
                  )}
                </div>
              </Container>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Section>
  )
}
