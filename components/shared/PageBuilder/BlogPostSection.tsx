import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/Carousel';
import { CustomLink } from '@/components/CustomLink';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { BlogPostProps, BlogPostSectionProps } from '@/components/shared/PageBuilder/hooks';
import { ROUTES } from '@/data/constants';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

interface PropsWithExtra extends BlogPostSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const BlogPostSection = ({ data }: Props) => {
  const { index, pageId, pageType, title, buttonText, sectionSettings, posts } = data;

  return (
    <Section
      label="blogPostSection"
      srHeading={`Section of blog posts`}
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
    >
      <div className="flex flex-col lg:hidden">
        <Container className="mb-6">{title && <Heading size="lg">{title}</Heading>}</Container>
        <Carousel className="mb-10 ml-4">
          <CarouselContent className="-ml-3">
            {posts?.map((post) => (
              <CarouselItem key={post.title} className="basis-[80%] pl-3">
                <BlogPostCard post={post} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {buttonText && (
          <Container>
            <Button asChild size="sm" className="w-full">
              <CustomLink href={ROUTES.BLOG}>{buttonText}</CustomLink>
            </Button>
          </Container>
        )}
      </div>
      <Container className="hidden flex-col gap-y-10 lg:flex">
        <div className="flex items-end justify-between">
          {title && (
            <Heading size="xl" className="max-w-lg text-balance">
              {title}
            </Heading>
          )}
          {buttonText && (
            <Button asChild size="md">
              <CustomLink href={ROUTES.BLOG}>{buttonText}</CustomLink>
            </Button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-x-4">
          {posts?.map((post) => <BlogPostCard key={post.title} post={post} />)}
        </div>
      </Container>
    </Section>
  );
};

function BlogPostCard({ post }: { post: BlogPostProps }) {
  const { title, description, readLength, image, slug } = post;

  if (!title || !image || !slug) {
    return null;
  }

  return (
    <article className="group">
      <CustomLink href={`/${ROUTES.BLOG}/${slug}`} className="relative">
        <div className="aspect-h-4 aspect-w-3 relative mb-4 h-0 w-full bg-[pink]">
          {image && <SanityImage image={image} fill className="h-full w-full" />}
        </div>
        <div className="flex flex-col pr-5">
          {readLength && <Badge className="mb-1">{readLength} min read</Badge>}
          {title && (
            <Heading size="sm" className="mb-3">
              {title}
            </Heading>
          )}
          {description && (
            <Text className="mb-6 font-medium text-brand-mid-grey">{description}</Text>
          )}
          <div className="flex items-center gap-x-2">
            <Text className="font-medium text-brand-mid-grey transition-all duration-100 ease-in-out group-hover:mr-1.5">
              Read more
            </Text>
            <ArrowUpRightIcon className="size-4 " />
          </div>
        </div>
      </CustomLink>
    </article>
  );
}
