import { ProductsPerRowSelector } from './CollectionSettingsBarDesktop/ProductsPerRowSelector';
import { Sort } from './CollectionSettingsBarDesktop/Sort';

export function SortingGroup() {
  return (
    <div className="flex h-full flex-col justify-between space-y-2">
      <div className="flex space-x-10">
        <ProductsPerRowSelector />
        <Sort />
      </div>
      <div className="flex justify-end">
        <p>25 products</p>
      </div>
      {/* <div className="flex flex-col items-end justify-between">
        <p>recommended</p>
        <p>25 products</p>
      </div> */}
    </div>
  );
}
