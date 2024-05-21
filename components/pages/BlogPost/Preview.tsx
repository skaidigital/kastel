import { BlogPost } from '@/components/pages/BlogPost';
import { BlogPostPayload, getBlogPostQuery } from '@/components/pages/BlogPost/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { useLiveQuery } from 'next-sanity/preview';

interface Props {
  post: BlogPostPayload;
  market: MarketValues;
  lang: LangValues;
}

export function BlogPostPreview({ post, market, lang }: Props) {
  const query = getBlogPostQuery({ lang, market });

  const [data] = useLiveQuery<BlogPostPayload>(post, query, {});

  return <BlogPost data={data} lang={lang} />;
}
