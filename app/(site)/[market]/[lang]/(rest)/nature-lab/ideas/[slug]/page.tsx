import { Phase1BlogPost } from '@/components/pages/nature-lab/Phase1BlogPost';
import {
  Phase1BlogPostPayload,
  getPhase1BlogPost
} from '@/components/pages/nature-lab/Phase1BlogPost/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { loadQuery } from '@sanity/react-loader';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export async function generateStaticParams({ params: { lang } }: { params: { lang: LangValues } }) {
  const slugs = await generateStaticSlugs(lang, CACHE_TAGS.NATURE_LAB.PHASE_1_BLOG_POST);

  return slugs;
}

function getData({ slug, lang }: { slug: string; lang: LangValues }) {
  const query = getPhase1BlogPost({ lang });

  return loadQuery<Phase1BlogPostPayload | null>(
    query,
    { slug },
    { next: { tags: [`${CACHE_TAGS.NATURE_LAB.PHASE_1_BLOG_POST}:${slug}`] } }
  );
}

interface Props {
  params: { slug: string; lang: LangValues };
}

export default async function Page({ params }: Props) {
  const { slug, lang } = params;

  const initial = await getData({ slug, lang });

  if (!initial.data) {
    return notFound();
  }

  return <Phase1BlogPost data={initial.data} slug={slug} />;
}
