import { RetailersPage } from '@/components/pages/RetailersPage';
import { getRetailersPageQuery } from '@/components/pages/RetailersPage/hooks';
import { MarketValues } from '@/data/constants';
import { loadQuery } from '@/lib/sanity/store';

async function loadRetailersPage(market: MarketValues) {
  const sanityQuery = getRetailersPageQuery(market);
  return loadQuery<any>(sanityQuery, {}, { next: { tags: [`retailers`] } });
}

interface Props {
  params: { market: MarketValues };
}

export default async function Page({ params: { market } }: Props) {
  const initial = await loadRetailersPage(market);

  return <RetailersPage title={initial.data.title} retailers={initial.data.retailers} />;
}
