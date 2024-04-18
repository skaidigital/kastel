import { RetailersPage } from '@/components/pages/RetailersPage';
import { getRetailersPageQuery } from '@/components/pages/RetailersPage/hooks';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';

async function loadRetailersPage(market: MarketValues) {
  const sanityQuery = getRetailersPageQuery(market);
  return loadQuery<any>(sanityQuery, {}, { next: { tags: [`retailers`] } });
}

export default async function Page() {
  const market = await getMarket();
  const initial = await loadRetailersPage(market);

  return (
    <div className="h-dvh bg-gray-100">
      <RetailersPage title={initial.data.title} retailers={initial.data.retailers} />
    </div>
  );
}
