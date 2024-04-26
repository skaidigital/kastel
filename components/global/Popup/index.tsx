import { PopupLayout } from '@/components/global/Popup/PopupLayout';
import { PopupPayload, getPopupQuery, popupValidator } from '@/components/global/Popup/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { env } from '@/env';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { draftMode } from 'next/headers';

function loadPopup(lang: LangValues) {
  const query = getPopupQuery(lang);

  return loadQuery<PopupPayload>(query, {}, { next: { tags: [CACHE_TAGS.POPUP] } });
}

interface Props {
  lang: LangValues;
}

export async function Popup({ lang }: Props) {
  const initial = await loadPopup(lang);
  const isDraftMode = draftMode().isEnabled;

  if (!initial.data || !initial.data.isShown) {
    return null;
  }

  const withoutNullValues = nullToUndefined(initial.data);
  let validatedData;

  if (isDraftMode) {
    validatedData = popupValidator.safeParse(withoutNullValues);

    if (!validatedData.success) {
      console.error(validatedData.error);
      return null;
    }
  }

  const popup = isDraftMode ? validatedData?.data : withoutNullValues;
  const klaviyoListId = env.KLAVIYO_NEWSLETTER_LIST_ID;

  if (!popup) {
    return null;
  }

  return <PopupLayout data={popup} klaviyoListId={klaviyoListId} />;
}
