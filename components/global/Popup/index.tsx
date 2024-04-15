import { PopupLayout } from '@/components/global/Popup/PopupLayout';
import { PopupPayload, getPopupQuery, popupValidator } from '@/components/global/Popup/hooks';
import { CACHE_TAGS, MarketValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';

function loadPopup(market: MarketValues) {
  const query = getPopupQuery(market);

  return loadQuery<PopupPayload>(query, {}, { next: { tags: [CACHE_TAGS.POPUP] } });
}

interface Props {
  market: MarketValues;
}

export async function Popup({ market }: Props) {
  const initial = await loadPopup(market);

  if (!initial.data || !initial.data.isShown) {
    return null;
  }

  const withoutNullValues = nullToUndefined(initial.data);
  const validatedData = popupValidator.parse(withoutNullValues);

  return <PopupLayout data={validatedData} />;
}
