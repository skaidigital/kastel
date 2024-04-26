import { productAccountSchema } from '@/app/(site)/[market]/[lang]/(rest)/account/(overview)/hooks';
import { Badge } from '@/components/Badge';
import { CustomLink } from '@/components/CustomLink';
import { SanityImage } from '@/components/sanity/SanityImage';

interface Props {
  title?: string;
  products?: productAccountSchema[];
}

export function ProductDisplay({ title, products }: Props) {
  return (
    <div className="flex flex-col gap-y-4 rounded-[4px] border border-brand-light-grey p-6">
      <span className="text-md font-bold">{title}</span>
      {products && (
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.product.image.asset._ref} className="flex gap-x-4">
              <div className="relative h-20 w-20 rounded-[4px]">
                <SanityImage image={product.product.image} fill />
              </div>
              <CustomLink href={'#'}>
                <div className="flex flex-col pt-2">
                  {product.badgeTitle && (
                    <Badge title={product.badgeTitle}>
                      <span className="mb-1 text-xs font-medium">{product.badgeTitle}</span>
                    </Badge>
                  )}
                  <span className="mb-2 text-sm font-medium">{product.title}</span>
                  <span className="text-xs text-brand-mid-grey">{product.description}</span>
                </div>
              </CustomLink>
            </div>
          ))}
        </div>
      )}
      {/* {JSON.stringify(products)} */}
    </div>
  );
}
