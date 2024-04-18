import { PopupLayout } from '@/components/global/Popup/PopupLayout';
import { PopupPayload, getPopupQuery, popupValidator } from '@/components/global/Popup/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';

function loadPopup(lang: LangValues) {
  const query = getPopupQuery(lang);

  return loadQuery<PopupPayload>(query, {}, { next: { tags: [CACHE_TAGS.POPUP] } });
}

interface Props {
  lang: LangValues;
}

export async function Popup({ lang }: Props) {
  const initial = await loadPopup(lang);

  if (!initial.data || !initial.data.isShown) {
    return null;
  }

  const withoutNullValues = nullToUndefined(initial.data);
  const validatedData = popupValidator.parse(withoutNullValues);

  return <PopupLayout data={validatedData} />;
}
