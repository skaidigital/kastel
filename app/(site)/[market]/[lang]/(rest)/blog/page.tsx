import { BlogLandingPage } from '@/components/pages/BlogLandingPage';
import {
  BlogPostLandingPagePayload,
  getBlogPostLandingPagePayload
} from '@/components/pages/BlogLandingPage/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';

export const dynamic = 'force-static';

function loadBlogLandingPage({ lang }: { lang: LangValues }) {
  const query = getBlogPostLandingPagePayload({ lang });

  return loadQuery<BlogPostLandingPagePayload | null>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.BLOG_POST] } }
  );
}

interface Props {
  params: { lang: LangValues };
}

export default async function Page({ params }: Props) {
  const { lang } = params;

  const initial = await loadBlogLandingPage({ lang });

  const pageWithoutNullValues = nullToUndefined(initial.data);

  return <BlogLandingPage data={pageWithoutNullValues} lang={lang} />;
}
