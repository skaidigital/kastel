import { Container } from '@/components/base/Container';
import { Heading, headingStyles } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
// import { IdealImage } from '@/components/sanity/RobotoImages';
import { getDictionary } from '@/app/dictionaries';
import { BackButton } from '@/components/BackButton';
import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { PageNotFoundPayload } from './hooks';

export interface Props {
  data: PageNotFoundPayload;
}

export async function PageNotFound({ data }: Props) {
  const { title, content, image } = data;
  const { not_found_page } = await getDictionary();
  const subtitle = '404';

  return (
    <Section label="404-page-not-found" srHeading="Page Not Found" className=" bg-white ">
      <Container>
        <div className="grid min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white lg:grid-cols-[max(50%,36rem),1fr]">
          <div className="sm:py-32 mx-auto w-full max-w-7xl px-6 py-24 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
            <div className="max-w-lg">
              <Text className={headingStyles({ size: 'sm' })}>{subtitle}</Text>
              <Heading as="h1" size="lg" className="mt-2">
                {title}
              </Heading>
              <p className="mt-4 text-base leading-7 text-gray-600">{content}</p>
              <div className="mt-16">
                <BackButton href="/">{not_found_page.back_to_home}</BackButton>
              </div>
            </div>
          </div>
          <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
            <SanityImage
              priority
              image={image}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
