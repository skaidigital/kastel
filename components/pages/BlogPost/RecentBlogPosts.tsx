import { BlogPostCard } from '@/components/BlogPostCard';
import { Button } from '@/components/Button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/Carousel';
import { CustomLink } from '@/components/CustomLink';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { BlogPostsProps } from '@/components/pages/BlogPost/hooks';
import { ROUTES } from '@/data/constants';

export function RecentBlogPosts({ title, posts, buttonText }: BlogPostsProps) {
  return (
    <Section label="blogPostSection" srHeading={`Section of blog posts`} noTopPadding>
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
            <h2 className="max-w-lg text-balance text-heading-xl font-bold uppercase">{title}</h2>
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
}
