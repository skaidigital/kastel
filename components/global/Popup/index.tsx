import { PopupLayout } from '@/components/global/Popup/PopupLayout';
import { PopupPayload, getPopupQuery, popupValidator } from '@/components/global/Popup/hooks';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';

function loadPopup(market: MarketValues) {
  const query = getPopupQuery(market);

  return loadQuery<PopupPayload>(query, {}, { next: { tags: ['popup'] } });
}

export async function Popup() {
  const market = await getMarket();
  const initial = await loadPopup(market);

  if (!initial.data.isShown) {
    return null;
  }

  const withoutNullValues = nullToUndefined(initial.data);
  const validatedData = popupValidator.parse(withoutNullValues);

  return <PopupLayout data={validatedData} />;
}
