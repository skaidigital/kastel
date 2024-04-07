import { Dictionary } from '@/app/dictionaries';
import { ProductPageLayout } from '@/components/pages/ProductPage/ProductPageLayout';
import { Product } from '@/components/pages/ProductPage/hooks';

export interface PageProps {
  data: Product;
  dictionary: Dictionary['product_page'];
}

export function ProductPage({ data, dictionary }: PageProps) {
  return <ProductPageLayout data={data} dictionary={dictionary} />;
}
