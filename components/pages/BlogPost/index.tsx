import { Container } from '@/components/base/Container'
import { Section } from '@/components/base/Section'
import { BlogPostAuthor } from '@/components/pages/BlogPost/BlogPostAuthor'
import { BlogPostHeader } from '@/components/pages/BlogPost/BlogPostHeader'
import { RecentBlogPosts } from '@/components/pages/BlogPost/RecentBlogPosts'
import { BlogPostPayload } from '@/components/pages/BlogPost/hooks'
import { LangValues } from '@/data/constants'
import { portableTextBlogPostSerializer } from '@/lib/sanity/portableTextBlogPostSerializer'
import { PortableText } from '@portabletext/react'

export interface Props {
  data: BlogPostPayload
  lang: LangValues
}

export function BlogPost({ data, lang }: Props) {
  if (!data) return null

  const {
    title,
    content,
    readTime,
    author,
    aspectRatioMobile,
    aspectRatioDesktop,
    imageMobile,
    imageDesktop,
    blogPosts
  } = data

  return (
    <Section label="blogPostContent" srHeading="Blog post content" className="pt-10 lg:pt-20">
      <Container>
        <BlogPostHeader
          title={title}
          readTime={readTime}
          lang={lang}
          aspectRatioMobile={aspectRatioMobile}
          aspectRatioDesktop={aspectRatioDesktop}
          imageMobile={imageMobile}
          imageDesktop={imageDesktop}
        />
        {content && <PortableText value={content} components={portableTextBlogPostSerializer} />}
        {author && (
          <BlogPostAuthor
            name={author.name}
            role={author.role}
            image={author.image}
            description={author.description}
            className="mb-20 mt-12 lg:mx-auto lg:mb-40 lg:max-w-[--blog-post-container-md]"
          />
        )}
      </Container>
      {blogPosts && <RecentBlogPosts data={blogPosts} lang={lang} />}
    </Section>
  )
}
