import { Heading } from '@/components/base/Heading';

interface Props {
  title: string;
  products: any;
}

export function ProductDisplay({ title, products }: Props) {
  return (
    <div className="flex flex-col gap-y-4 rounded-[4px] border border-brand-light-grey p-6">
      <Heading>{title}</Heading>
      {JSON.stringify(products)}
    </div>
  );
}
