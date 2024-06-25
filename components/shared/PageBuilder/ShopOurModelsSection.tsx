'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Carousel } from '@/components/Carousel'
import { CustomLink } from '@/components/CustomLink'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Container } from '@/components/base/Container'
import { Heading } from '@/components/base/Heading'
import { Section } from '@/components/base/Section'
import { Text } from '@/components/base/Text'
import { SanityImage } from '@/components/sanity/SanityImage'
import { ShopOurModelsSectionProps } from '@/components/shared/PageBuilder/hooks'
import { ROUTES } from '@/data/constants'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'

interface PropsWithExtra extends ShopOurModelsSectionProps {
  index: number
  pageId: string
  pageType: string
}

interface Props {
  data: PropsWithExtra
}

export const ShopOurModelsSection = ({ data }: Props) => {
  const { badge, shoes, buttonText, sectionSettings } = data

  const [activeShoeTitle, setActiveShoeTitle] = useState<string | undefined>(shoes?.at(0)?.title)
  const activeShoe = shoes?.find((shoe) => shoe.title === activeShoeTitle)

  const firstShoeOrFirstIndex =
    activeShoe?.colorWays?.find((as) => as.slug === activeShoe.firstShoeSlug)?.slug ||
    activeShoe?.colorWays?.at(0)?.slug
  const [activeColorwaySlug, setActiveColorwaySlug] = useState<string | undefined>(
    firstShoeOrFirstIndex
  )
  const activeColorway = activeShoe?.colorWays?.find(
    (colorway) => colorway.slug === activeColorwaySlug
  )

  const slug = activeColorway?.slug
  const shoeCount = shoes?.length
  const currentShoeNumber = activeShoe ? shoes?.indexOf(activeShoe) + 1 : undefined

  function setNextActiveShoe() {
    if (!shoes || !activeShoe) return

    if (shoes.indexOf(activeShoe) === shoes.length - 1) {
      setActiveShoeTitle(shoes[0]?.title)
    } else {
      setActiveShoeTitle(shoes[shoes.indexOf(activeShoe) + 1]?.title)
    }
  }

  function setPrevActiveShoe() {
    if (!shoes || !activeShoe) return

    if (shoes.indexOf(activeShoe) === 0) {
      setActiveShoeTitle(shoes[shoes.length - 1]?.title)
    } else {
      setActiveShoeTitle(shoes[shoes.indexOf(activeShoe) - 1]?.title)
    }
  }

  useEffect(() => {
    if (activeShoe) {
      const firstShoeOrFirstIndex =
        activeShoe?.colorWays?.find((as) => as.slug === activeShoe.firstShoeSlug)?.slug ||
        activeShoe?.colorWays?.at(0)?.slug

      setActiveColorwaySlug(firstShoeOrFirstIndex)
    }
  }, [activeShoe])

  return (
    <Section
      label="shopOurModelsSection"
      srHeading={`Shop Our Models Section`}
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
    >
      <Container className="flex flex-col gap-y-6 lg:hidden">
        <div className="flex flex-col">
          {badge && <Badge className="mb-2">{badge}</Badge>}
          {activeShoe?.title && (
            <Select value={activeShoeTitle} onValueChange={setActiveShoeTitle}>
              <SelectTrigger
                aria-label="Select shoe"
                className="h-fit w-fit gap-4 border-0 pl-0 [&>svg]:size-8"
              >
                <SelectValue asChild className="rounded-none">
                  <Heading size="lg" className="whitespace-break-spaces text-balance text-left">
                    {activeShoe?.title}
                  </Heading>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {shoes?.map((shoe) => (
                  <SelectItem value={shoe.title} key={shoe.title} className="rounded-none">
                    <Heading className="text-heading-md lg:text-heading-lg">{shoe.title}</Heading>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {activeShoe?.description && (
            <Text className="mb-6 max-w-md text-balance text-brand-mid-grey">
              {activeShoe?.description}
            </Text>
          )}
          {activeShoe?.colorWays && (
            <div className="flex gap-2">
              {activeShoe.colorWays.map((colorWay) => (
                <button
                  aria-label={colorWay.title}
                  onClick={() => setActiveColorwaySlug(colorWay.slug)}
                  className={cn(
                    'size-10 border-2',
                    colorWay.slug === activeColorwaySlug
                      ? 'border-black'
                      : 'border-brand-light-grey'
                  )}
                  key={colorWay.slug}
                  style={{ background: colorWay.hexCode }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="aspect-h-4 aspect-w-3 relative h-0 w-full">
          {activeColorway && (
            <SanityImage
              image={activeColorway.image}
              fill
              className="absolute object-cover"
              sizes="100vw"
            />
          )}
        </div>
        <div className="flex flex-col items-center gap-y-6">
          {slug && (
            <Button size="sm" asChild className="w-full">
              {buttonText && (
                <CustomLink href={`${ROUTES.PRODUCTS}/${slug}`}>{buttonText}</CustomLink>
              )}
            </Button>
          )}
          {activeShoe?.usps?.length && (
            <div className="flex gap-x-8">
              {activeShoe.usps.map((usp) => (
                <div key={usp.title} className="flex flex-col items-center gap-y-1">
                  <SanityImage width={40} height={40} image={usp.image} noPlaceholder />
                  <Text size="overline-sm">{usp.title}</Text>
                </div>
              ))}
            </div>
          )}
          {activeShoe?.details && (
            <Accordion
              type="single"
              collapsible
              defaultValue={activeShoe.details.at(0)?.title}
              className="w-full"
            >
              {activeShoe.details.map((detail) => (
                <AccordionItem value={detail.title} key={detail.title} className="border-b-0 py-2">
                  <AccordionTrigger className="mb-2 text-sm font-medium uppercase">
                    {detail.title}
                  </AccordionTrigger>
                  <AccordionContent>{detail.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </Container>
      {/* Desktop */}
      <Container className="hidden grid-cols-12 gap-4 lg:grid">
        <Carousel className="col-span-5 col-start-2 flex flex-col gap-y-14">
          <div className="flex max-w-md flex-col">
            {badge && <Badge className="mb-2">{badge}</Badge>}
            {activeShoe?.title && (
              <Heading size="lg" className="mb-4">
                {activeShoe?.title}
              </Heading>
            )}
            {activeShoe?.description && (
              <Text className="mb-6 text-balance text-brand-mid-grey">
                {activeShoe?.description}
              </Text>
            )}
            {activeShoe?.usps?.length && (
              <div className="flex gap-x-8">
                {activeShoe.usps.map((usp) => (
                  <div key={usp.title} className="flex flex-col items-center gap-y-1">
                    <SanityImage width={40} height={40} image={usp.image} noPlaceholder />
                    <Text size="overline-sm">{usp.title}</Text>
                  </div>
                ))}
              </div>
            )}
          </div>
          {activeShoe?.details && (
            <Accordion type="single" collapsible defaultValue={activeShoe.details.at(0)?.title}>
              {activeShoe.details.map((detail) => (
                <AccordionItem
                  value={detail.title}
                  key={detail.title}
                  className="border-b-0 py-2 lg:py-2"
                >
                  <AccordionTrigger className="mb-4 text-md font-medium uppercase">
                    {detail.title}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-md text-sm text-brand-mid-grey">
                    {detail.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
          <div className="flex items-center gap-x-2">
            <Button onClick={setPrevActiveShoe} variant="outline" size="icon-lg">
              <ArrowLeftIcon className="size-10 text-brand-primary" />
              <span className="sr-only">Previous slide</span>
            </Button>
            {shoeCount && currentShoeNumber && (
              <Text size="lg" className="p-2 text-brand-mid-grey">
                {currentShoeNumber} / {shoeCount}
              </Text>
            )}
            <Button onClick={setNextActiveShoe} variant="outline" size="icon-lg">
              <ArrowRightIcon className="size-10 text-brand-primary" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </Carousel>
        <div className="col-span-4 flex flex-col gap-y-6 lg:col-start-8">
          <div className="aspect-h-4 aspect-w-3 relative h-0 w-full">
            {activeColorway && (
              <SanityImage
                image={activeColorway.image}
                fill
                className="absolute object-cover"
                sizes="33vw"
              />
            )}
            {activeShoe?.colorWays && (
              <div className="absolute bottom-0 left-0 flex items-end justify-center pb-6">
                <div className="flex gap-2">
                  {activeShoe.colorWays.map((colorWay) => (
                    <button
                      aria-label={colorWay.title}
                      onClick={() => setActiveColorwaySlug(colorWay.slug)}
                      className={cn(
                        'size-10 border-2',
                        colorWay.slug === activeColorwaySlug
                          ? 'border-black'
                          : 'border-brand-light-grey'
                      )}
                      key={colorWay.slug}
                      style={{ background: colorWay.hexCode }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          {slug && (
            <Button size="md" asChild className="w-full">
              {buttonText && (
                <CustomLink href={`${ROUTES.PRODUCTS}/${slug}`}>{buttonText}</CustomLink>
              )}
            </Button>
          )}
        </div>
      </Container>
    </Section>
  )
}
