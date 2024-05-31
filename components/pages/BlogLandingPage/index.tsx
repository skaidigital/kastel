import { BlogPostCard } from '@/components/BlogPostCard';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { BlogPostLandingPagePayload } from '@/components/pages/BlogLandingPage/hooks';
import { LangValues } from '@/data/constants';

export interface Props {
  data: BlogPostLandingPagePayload;
  lang: LangValues;
}

// TODO få Petter til å adde pagination. Ikke viktig siden det ikke er så mange blog posts
// F.eks adde hasNextPage og sånne ting i query. Lar det utegå enn gå lenge
export function BlogLandingPage({ data, lang }: Props) {
  if (!data) return null;

  const { title, description, posts } = data;

  return (
    <Section
      label="blogPostContent"
      srHeading="Blog post content"
      className="grid gap-10 pt-10 lg:gap-28 lg:pt-20"
    >
      <Container className="grid gap-6 lg:grid-cols-12 lg:gap-4">
        {title && (
          <Heading as="h1" size="xl" className="lg:col-span-3">
            {title}
          </Heading>
        )}
        {description && (
          <Text size="md" as="p" className="text-brand-mid-grey lg:col-span-5 lg:col-start-5">
            {description}
          </Text>
        )}
      </Container>
      <Container className="grid gap-10 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-16">
        {posts?.map((post) => (
          <BlogPostCard post={post} key={post.title} sizes="(max-width: 768px) 80vw, 33vw" />
        ))}
      </Container>
    </Section>
  );
}
