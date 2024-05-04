import { BlogPostCard } from '@/components/BlogPostCard';
import { Button } from '@/components/Button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/Carousel';
import { CustomLink } from '@/components/CustomLink';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { BlogPostsProps } from '@/components/pages/BlogPost/hooks';
import { LangValues, ROUTES } from '@/data/constants';

interface Props {
  lang: LangValues;
  data: BlogPostsProps;
}

export function RecentBlogPosts({ lang, data }: Props) {
  const { type, posts } = data;

  const isMostRecent = type === 'mostRecent';

  const mostRecentBlogPostsString = getRecentBlogPostsString(lang);
  const checkOutTheBlogString = getCheckOutTheBlogString(lang);

  return (
    <Section label="blogPostSection" srHeading={`Section of blog posts`} noTopPadding>
      <div className="flex flex-col lg:hidden">
        <Container className="mb-6">
          {isMostRecent ? (
            <Heading size="lg">{mostRecentBlogPostsString}</Heading>
          ) : (
            data.title && <Heading size="lg">{data.title}</Heading>
          )}
        </Container>
        <Carousel className="mb-10 ml-4">
          <CarouselContent className="-ml-3">
            {posts?.map((post) => (
              <CarouselItem key={post.title} className="basis-[80%] pl-3">
                <BlogPostCard post={post} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Container>
          <Button asChild size="sm" className="w-full">
            <CustomLink href={ROUTES.BLOG}>
              {isMostRecent ? checkOutTheBlogString : data.buttonText && data.buttonText}
            </CustomLink>
          </Button>
        </Container>
      </div>
      <Container className="hidden flex-col gap-y-10 lg:flex">
        <div className="flex items-end justify-between">
          <h2 className="max-w-lg text-balance text-heading-xl font-bold uppercase">
            {isMostRecent ? mostRecentBlogPostsString : data.title && data.title}
          </h2>
          <Button asChild size="md">
            <CustomLink href={ROUTES.BLOG}>
              {isMostRecent ? checkOutTheBlogString : data.buttonText && data.buttonText}
            </CustomLink>
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-x-4">
          {posts?.map((post) => <BlogPostCard key={post.title} post={post} />)}
        </div>
      </Container>
    </Section>
  );
}

function getRecentBlogPostsString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Recent blog posts';
    case 'no':
      return 'Nylige blogginnlegg';
    default:
      return 'Recent blog posts';
  }
}
function getCheckOutTheBlogString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Check out the blog';
    case 'no':
      return 'Sjekk ut bloggen';
    default:
      return 'Check out the blog';
  }
}
