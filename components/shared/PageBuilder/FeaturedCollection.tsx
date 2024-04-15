import { Button } from '@/components/Button';
import { Media } from '@/components/Media';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { FeaturedCollectionProps } from '@/components/shared/PageBuilder/hooks';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface PropsWithExtra extends FeaturedCollectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const FeaturedCollection = ({ data }: Props) => {
  const { index, pageId, pageType, title, description, media, slug, buttonText } = data;

  return (
    <Section
      label="featuredCollection"
      srHeading={`Featured collection – ${title ? title : 'Untitled'}`}
    >
      <div className="flex flex-col gap-y-10 lg:hidden">
        <MediaContent title={title} description={description} media={media} />
        <div className="h-[80px] bg-[red] ml-4">products</div>
        {buttonText && slug && (
          <Container>
            <Button asChild size="sm" className="w-full">
              <Link href={slug}>{buttonText}</Link>
            </Button>
          </Container>
        )}
      </div>
      <Container className="hidden gap-y-10 lg:block">
        <div className="flex justify-end">
          <div className="flex gap-x-4">
            <div className="flex gap-x-2">
              <Button size="icon" variant="outline">
                <ChevronLeftIcon />
              </Button>
              <Button size="icon" variant="outline">
                <ChevronRightIcon />
              </Button>
            </div>
            {buttonText && (
              <Button asChild>
                <Link href={slug}>{buttonText}</Link>
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-x-10">
          <MediaContent title={title} description={description} media={media} />
          <div className="w-full bg-[red] h-[80px]">products 2</div>
        </div>
      </Container>
    </Section>
  );
};

function MediaContent({
  title,
  description,
  media
}: {
  title: string;
  description: string;
  media: FeaturedCollectionProps['media'];
}) {
  return (
    <div className="w-full lg:max-w-[480px]">
      <div className="aspect-h-4 aspect-w-3 relative h-0 w-full bg-gradient-to-t from-black/80 from-0% to-black/20 to-30%">
        <Media media={{ ...media }} loading="lazy" />
        <div className="flex items-end justify-start">
          <div className="flex h-fit w-fit flex-col gap-y-4 p-8 text-white">
            {title && (
              <Heading as="h2" size="xl">
                {title}
              </Heading>
            )}
            {description && <Text>{description}</Text>}
          </div>
        </div>
      </div>
    </div>
  );
}
