import { LayoutUSPMarqueeLayout } from '@/components/global/LayoutUSPMarquee/Layout';
import {
  LayoutUSPMarqueePayload,
  getLayoutUSPMarqueeQuery,
  layoutUSPMarqueeValidator
} from '@/components/global/LayoutUSPMarquee/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { draftMode } from 'next/headers';

function loadLayoutUSPMarquee(lang: LangValues) {
  const query = getLayoutUSPMarqueeQuery(lang);

  return loadQuery<LayoutUSPMarqueePayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.LAYOUT_USP_MARUQEE] } }
  );
}

interface Props {
  lang: LangValues;
}

export async function LayoutUSPMarquee({ lang }: Props) {
  const initial = await loadLayoutUSPMarquee(lang);
  const isDraftMode = draftMode().isEnabled;

  const marqueeWithoutNullValues = nullToUndefined(initial.data);
  let validatedMarquee;

  if (isDraftMode) {
    validatedMarquee = layoutUSPMarqueeValidator.safeParse(marqueeWithoutNullValues);

    if (!validatedMarquee.success) {
      console.error('Failed to validate footer data', validatedMarquee.error);
      return null;
    }
  }

  const marquee = isDraftMode ? validatedMarquee?.data : marqueeWithoutNullValues;

  return <LayoutUSPMarqueeLayout data={marquee} />;
}
