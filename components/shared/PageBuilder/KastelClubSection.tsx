'use client';

import { Button } from '@/components/Button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/Carousel';
import { CustomLink } from '@/components/CustomLink';
import { Media } from '@/components/Media';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { KastelClubSectionProps } from '@/components/shared/PageBuilder/hooks';
import { ROUTES } from '@/data/constants';
import { SanityImageProps } from '@/lib/sanity/types';

interface PropsWithExtra extends KastelClubSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const KastelClubSection = ({ data }: Props) => {
  const {
    index,
    pageId,
    pageType,
    title,
    description,
    buttonText,
    backgroundImage,
    steps,
    lastSlide,
    sectionSettings
  } = data;

  return (
    <Section
      label="kastelClubSection"
      srHeading="Explanation of the Kastel Club loyalty program"
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
      className="bg-brand-sand"
    >
      <div className="flex flex-col gap-y-4 lg:hidden">
        <Intro
          title={title}
          description={description}
          buttonText={buttonText}
          backgroundImage={backgroundImage}
        />
        <Carousel className="ml-4">
          <CarouselContent className="-ml-3">
            {steps.map((step) => (
              <CarouselItem key={step.titleFront} className="basis-[80%] pl-3">
                <BackCard
                  title={step.titleBack}
                  description={step.descriptionBack}
                  descriptionList={step.descriptionList}
                />
              </CarouselItem>
            ))}
            <CarouselItem className="basis-[80%] pl-3">
              <div className="aspect-h-1 aspect-w-1 relative">
                {lastSlide && <Media media={lastSlide} loading="lazy" />}
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <Container className="hidden grid-cols-4 grid-rows-2 gap-4 lg:grid">
        <div className="col-span-2 row-span-2">
          <Intro
            title={title}
            description={description}
            buttonText={buttonText}
            backgroundImage={backgroundImage}
          />
        </div>
        {steps.map((step) => (
          <DesktopCard
            titleFront={step.titleFront}
            descriptionFront={step.descriptionFront}
            linkText={step.linkText}
            titleBack={step.titleBack}
            descriptionBack={step.descriptionBack}
            descriptionList={step.descriptionList}
            key={step.titleFront}
          />
        ))}
        {lastSlide && (
          <div className="relative col-span-1 row-span-1">
            <Media media={lastSlide} loading="lazy" />
          </div>
        )}
      </Container>
    </Section>
  );
};

interface IntroProps {
  title: string;
  buttonText: string;
  backgroundImage: SanityImageProps;
  description?: string;
}

function Intro({ title, description, buttonText, backgroundImage }: IntroProps) {
  return (
    <div className="aspect-h-4 aspect-w-3 relative h-0 w-full lg:aspect-h-1 lg:aspect-w-1">
      <div className="absolute z-30 flex items-end">
        <div className="flex flex-col gap-y-4 p-6 text-white lg:max-w-lg lg:gap-y-6 xl:p-8">
          {title && <Heading size="xl">{title}</Heading>}
          {description && <Text>{description}</Text>}
          {buttonText && (
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="lg:py-6 lg:text-[24px] lg:leading-[24px]"
            >
              <CustomLink href={ROUTES.KASTEL_CLUB}>{buttonText}</CustomLink>
            </Button>
          )}
        </div>
      </div>
      <div className="absolute z-20 h-full w-full bg-gradient-to-t from-black/80 from-0% to-black/20 to-30% " />
      {backgroundImage && (
        <SanityImage
          image={backgroundImage}
          fill
          className="absolute inset-0 z-10 h-full w-full object-cover"
        />
      )}
    </div>
  );
}

interface BackCardProps {
  title: string;
  description: string;
  descriptionList?: { descriptionTerm: string; descriptionDetails: string }[];
}

function BackCard({ title, description, descriptionList }: BackCardProps) {
  return (
    <div className="aspect-h-1 aspect-w-1 bg-white">
      <div className="flex flex-col justify-between p-6">
        <div className="flex max-w-40 flex-col gap-y-2">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && <Text size="sm">{description}</Text>}
        </div>
        {descriptionList && (
          <dl className="flex flex-col gap-y-2">
            {descriptionList.map(({ descriptionTerm, descriptionDetails }) => (
              <div key={descriptionTerm} className="flex items-center justify-between">
                {descriptionTerm && <dt className="text-sm">{descriptionTerm}</dt>}
                {descriptionDetails && (
                  <dd className="text-sm text-brand-mid-grey">{descriptionDetails}</dd>
                )}
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}

interface DesktopCardProps {
  titleFront: string;
  descriptionFront: string;
  linkText: string;
  titleBack: string;
  descriptionBack: string;
  descriptionList?: { descriptionTerm: string; descriptionDetails: string }[];
}

function DesktopCard({
  titleFront,
  descriptionFront,
  linkText,
  titleBack,
  descriptionBack,
  descriptionList
}: DesktopCardProps) {
  return (
    <div
      tabIndex={0}
      aria-roledescription="flipping card"
      className="flip-card h-full w-full bg-white"
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="flex items-center justify-center" style={{ height: 'inherit' }}>
            <div className="flex w-40 flex-col items-start justify-center ">
              {titleFront && <h3 className="mb-4 text-lg font-semibold">{titleFront}</h3>}
              {descriptionFront && (
                <Text size="sm" className="mb-2">
                  {descriptionFront}
                </Text>
              )}
              {linkText && (
                <Text size="sm" className="underline">
                  {linkText}
                </Text>
              )}
            </div>
          </div>
        </div>
        <div className="flip-card-back">
          <BackCard
            title={titleBack}
            description={descriptionBack}
            descriptionList={descriptionList}
          />
          {/* <div className="flex flex-col justify-between p-6">
            <div className="flex flex-col gap-y-2">
              {titleBack && <h3 className="text-lg font-semibold">{titleBack}</h3>}
              {descriptionBack && <Text size="sm">{descriptionBack}</Text>}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
