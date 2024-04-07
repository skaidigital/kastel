import { getDictionary } from '@/app/dictionaries';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { BundleSelection } from './BundleSelect';
import { BundleItemsValidator, BundleSelectSchema, getBundleSelectionsQuery } from './hooks';

function loadBundleSelector(slug: string, market: MarketValues) {
  const query = getBundleSelectionsQuery(market);

  return loadQuery<BundleSelectSchema>(
    query,
    { slug },
    { next: { tags: [`bundle:${slug}:${market}`] } }
  );
}
interface BundleSelectionsProps {
  slug: string;
}

export async function BundleSelections({ slug }: BundleSelectionsProps) {
  const market = await getMarket();
  const initial = await loadBundleSelector(slug, market);

  const { bundle: bundle_select } = await getDictionary();

  if (!initial.data) {
    return null;
  }

  const cleanedProduct = nullToUndefined(initial.data);

  const validatedData = BundleItemsValidator.parse(cleanedProduct);

  return validatedData.items.map((optionGroup) => {
    return (
      <div key={optionGroup.title}>
        <h2 className="mb-2 text-eyebrow uppercase">Select {optionGroup.title}:</h2>

        <BundleSelection optionGroup={optionGroup} dictionary={bundle_select} />
      </div>
    );
  });
}
