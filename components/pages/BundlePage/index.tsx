import { Dictionary } from '@/app/dictionaries';
import { BundlePageLayout } from './BundlePageLayout';

export interface PageProps {
  data: any;
  dictionary: Dictionary['product_page'];
  params?: { [key: string]: string | string[] | undefined };
}

export function BundlePage({ data, dictionary, params }: PageProps) {
  return <BundlePageLayout data={data} dictionary={dictionary} params={params} />;
}
