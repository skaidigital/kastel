import { Section } from '@/components/base/Section';
import { BlogPostAuthor } from '@/components/pages/BlogPost/BlogPostAuthor';
import { BlogPostHeader } from '@/components/pages/BlogPost/BlogPostHeader';
import { RecentBlogPosts } from '@/components/pages/BlogPost/RecentBlogPosts';
import { BlogPostPayload } from '@/components/pages/BlogPost/hooks';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { LangValues } from '@/data/constants';

export interface Props {
  data: BlogPostPayload;
  lang: LangValues;
}

export function BlogPost({ data, lang }: Props) {
  const { content, blogPosts, author } = data;

  console.log(author);

  return (
    <Section label="blogPostContent" srHeading="Blog post content">
      <BlogPostHeader title="Title" readTime="5" />
      <PortableTextRenderer value={content} type="blogPost" />
      {author && (
        <BlogPostAuthor
          name={author.name}
          role={author.role}
          image={author.image}
          description={author.description}
          className="mb-20 mt-12 lg:mx-auto lg:mb-40 lg:max-w-[--blog-post-container-md]"
        />
      )}
      {blogPosts && (
        <RecentBlogPosts
          title={blogPosts.title}
          posts={blogPosts.posts}
          buttonText={blogPosts.buttonText}
        />
      )}
    </Section>
  );
}
