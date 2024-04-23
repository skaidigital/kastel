import { ProductsPerRowSelector } from '../CollectionSettingsBarDesktop/ProductsPerRowSelector';
import { Sort } from '../CollectionSettingsBarDesktop/Sort';

export function SearchSettingsBar() {
  return (
    <div className="flex gap-x-10">
      <ProductsPerRowSelector />
      <Sort />
    </div>
  );
}
