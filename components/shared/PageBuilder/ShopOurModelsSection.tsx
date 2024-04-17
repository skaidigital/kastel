'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Carousel } from '@/components/Carousel';
import { CustomLink } from '@/components/CustomLink';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/form/RadixSelect';
import { SanityImage } from '@/components/sanity/SanityImage';
import { ShopOurModelsSectionProps } from '@/components/shared/PageBuilder/hooks';
import { ROUTES } from '@/data/constants';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface PropsWithExtra extends ShopOurModelsSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

// ? Burde denne gjøres om til å heller være å reference en productType?
export const ShopOurModelsSection = ({ data }: Props) => {
  const { index, pageId, pageType, badge, shoes, sectionSettings } = data;

  const [activeShoeTitle, setActiveShoeTitle] = useState<string | undefined>(shoes?.at(0)?.title);
  const activeShoe = shoes?.find((shoe) => shoe.title === activeShoeTitle);

  const [activeColorwaySlug, setActiveColorwaySlug] = useState<string | undefined>(
    activeShoe?.colorWays?.at(0)?.slug
  );
  const activeColorway = activeShoe?.colorWays?.find(
    (colorway) => colorway.slug === activeColorwaySlug
  );

  const slug = activeColorway?.slug;

  function setNextActiveShoe() {
    if (!shoes) return;
    // If at the end of the array, go back to the start
    if (shoes.indexOf(activeShoe) === shoes.length - 1) {
      setActiveShoeTitle(shoes[0]?.title);
    } else {
      setActiveShoeTitle(shoes[shoes.indexOf(activeShoe) + 1]?.title);
    }
  }

  function setPrevActiveShoe() {
    if (!shoes) return;
    // If at the start of the array, go back to the end
    if (shoes.indexOf(activeShoe) === 0) {
      console.log(shoes[shoes.length - 1]?.title);

      setActiveShoeTitle(shoes[shoes.length - 1]?.title);
    } else {
      console.log(shoes[shoes.indexOf(activeShoe) - 1]?.title);

      setActiveShoeTitle(shoes[shoes.indexOf(activeShoe) - 1]?.title);
    }
  }

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
          {badge && <Badge>{badge}</Badge>}
          {activeShoe?.title && (
            <Select value={activeShoeTitle} onValueChange={setActiveShoeTitle}>
              <SelectTrigger>
                <SelectValue asChild>
                  <Heading size="lg" className="mb-4">
                    {activeShoe?.title}
                  </Heading>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {shoes?.map((shoe) => (
                  <SelectItem value={shoe.title} key={shoe.title}>
                    <Heading size="lg" className="mb-4">
                      {shoe.title}
                    </Heading>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {activeShoe?.description && (
            <Text className="mb-6 text-brand-mid-grey">{activeShoe?.description}</Text>
          )}
          {activeShoe?.colorWays && (
            <div className="flex gap-2">
              {activeShoe.colorWays.map((colorWay) => (
                <button
                  onClick={() => setActiveColorwaySlug(colorWay.slug)}
                  className={cn(
                    'size-10',
                    colorWay.slug === activeColorwaySlug ? 'border border-black' : 'border-0'
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
            <SanityImage image={activeColorway.image} fill className="absolute object-cover" />
          )}
        </div>
        <div className="flex flex-col items-center gap-y-6">
          {slug && (
            <Button size="sm" asChild className="w-full">
              <CustomLink href={`${ROUTES.PRODUCTS}/${slug}`}>Check out the shoe</CustomLink>
            </Button>
          )}
          <div>usps here</div>
          {activeShoe?.details && (
            <Accordion type="single" collapsible defaultValue={activeShoe.details.at(0)?.title}>
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
      <Container className="hidden grid-cols-12 gap-4 lg:grid">
        <Carousel className="col-span-5 col-start-2 flex flex-col gap-y-14">
          <div className="flex max-w-md flex-col">
            {badge && <Badge>{badge}</Badge>}
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
          </div>
          {activeShoe?.details && (
            <Accordion type="single" collapsible defaultValue={activeShoe.details.at(0)?.title}>
              {activeShoe.details.map((detail) => (
                <AccordionItem
                  value={detail.title}
                  key={detail.title}
                  className="border-b-0 py-2 lg:py-2"
                >
                  <AccordionTrigger className="mb-2 text-sm font-medium uppercase">
                    {detail.title}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-sm">{detail.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
          <div className="flex gap-x-2">
            <Button onClick={setPrevActiveShoe} variant="outline" size="icon-lg">
              <ArrowLeftIcon className="size-10 text-brand-primary" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button onClick={setNextActiveShoe} variant="outline" size="icon-lg">
              <ArrowRightIcon className="size-10 text-brand-primary" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </Carousel>
        <div className="col-span-4 flex flex-col gap-y-6 lg:col-start-8">
          <div className="aspect-h-4 aspect-w-3 relative h-0 w-full">
            {activeColorway && (
              <SanityImage image={activeColorway.image} fill className="absolute object-cover" />
            )}
            {activeShoe?.colorWays && (
              <div className="absolute bottom-0 left-0 flex items-end justify-center pb-6">
                <div className="flex gap-2">
                  {activeShoe.colorWays.map((colorWay) => (
                    <button
                      onClick={() => setActiveColorwaySlug(colorWay.slug)}
                      className={cn(
                        'size-10',
                        colorWay.slug === activeColorwaySlug ? 'border border-black' : 'border-0'
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
              <CustomLink href={`${ROUTES.PRODUCTS}/${slug}`}>Check out the shoe</CustomLink>
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
};
