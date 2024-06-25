import { productAccountSchema } from '@/app/(site)/[market]/[lang]/(dynamic)/account/(has-sidebar)/hooks'
import { Badge } from '@/components/Badge'
import { CustomLink } from '@/components/CustomLink'
import { SanityImage } from '@/components/sanity/SanityImage'
import { ROUTES } from '@/data/constants'

interface Props {
  title?: string
  products?: productAccountSchema[]
}

export function ProductDisplay({ title, products }: Props) {
  return (
    <div className="flex flex-col gap-y-4 rounded-[4px] border border-brand-light-grey p-6">
      <h2 className="text-md font-bold">{title}</h2>
      {products && (
        <div className="space-y-6">
          {products.map((item) => (
            <CustomLink
              href={`${ROUTES.PRODUCTS}/${item.product.slug}`}
              key={item.product.image.asset._ref}
              className="flex gap-x-4"
            >
              <div className="w-20">
                <div className="aspect-h-1 aspect-w-1 relative rounded-[4px]">
                  <SanityImage image={item.product.image} fill className="absolute" />
                </div>
              </div>
              <div className="flex flex-col pt-2">
                {item.badgeTitle && (
                  <Badge className="mb-1" size="xs">
                    {item.badgeTitle}
                  </Badge>
                )}
                <h3 className="mb-2 text-sm font-medium">{item.title}</h3>
                <span className="text-xs text-brand-mid-grey">{item.description}</span>
              </div>
            </CustomLink>
          ))}
        </div>
      )}
    </div>
  )
}
