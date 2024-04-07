import { formatPrice } from '@/app/(site)/shopify/utils';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import EditItemQuantityButton from '@/components/shared/Cart/EditQuantityButton';
import RemoveFromCartButton from '@/components/shared/Cart/RemoveFromCartButton';
import { Money, SelectedOption, ShopifyImage } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import EditBundleItemQuantityButton from './EditBundleQuantityButton';

interface Props {
  lineId: string;
  variantId: string;
  title: string;
  option1?: SelectedOption;
  option2?: SelectedOption;
  option3?: SelectedOption;
  quantity: number;
  subtotal: Money;
  image: ShopifyImage;
  variantDescription?: string;
  className?: string;
  isBundle?: boolean;
}

export function CartItem({
  lineId,
  variantId,
  title,
  option1,
  option2,
  option3,
  quantity,
  subtotal,
  image,
  className,
  isBundle = false
}: Props) {
  const formattedPrice = formatPrice(subtotal);

  return (
    <div className={cn('flex w-full rounded-project', className)}>
      <div className="w-40">
        <AspectRatio ratio={3 / 4} className="relative">
          <div className="absolute right-0 top-0 z-40">
            <RemoveFromCartButton itemId={lineId} />
          </div>
          <Image
            src={image.url}
            alt={image.altText || "Ooops, we're missing an alt text!"}
            fill
            sizes=""
            className="rounded-project object-cover"
          />
        </AspectRatio>
      </div>
      <div className="relative flex w-full flex-col justify-between pl-5">
        <div className="flex flex-col space-y-1">
          <Heading as="h3" size="xs">
            {title}
          </Heading>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-1">
              {option1 && (
                <Text size="sm">
                  {option1.name}: {option1.value}
                </Text>
              )}
              {option2 && (
                <Text size="sm">
                  {option2.name}: {option2.value}
                </Text>
              )}
              {option3 && (
                <Text size="sm">
                  {option3.name}: {option3.value}
                </Text>
              )}
            </div>
            <div className="flex h-9 w-fit flex-row items-center rounded-project border border-brand-border">
              {!isBundle && (
                <>
                  <EditItemQuantityButton
                    lineId={lineId}
                    variantId={variantId}
                    quantity={quantity}
                    type="minus"
                  />
                  <p className="w-6 text-center">
                    <span className="w-full text-sm">{quantity}</span>
                  </p>
                  <EditItemQuantityButton
                    lineId={lineId}
                    variantId={variantId}
                    quantity={quantity}
                    type="plus"
                  />
                </>
              )}
              {isBundle && (
                <>
                  <EditBundleItemQuantityButton
                    lineId={lineId}
                    variantId={variantId}
                    quantity={quantity}
                    type="minus"
                  />
                  <p className="w-6 text-center">
                    <span className="w-full text-sm">{quantity}</span>
                  </p>
                  <EditBundleItemQuantityButton
                    lineId={lineId}
                    variantId={variantId}
                    quantity={quantity}
                    type="plus"
                  />
                </>
              )}
            </div>
          </div>
          <Text size="sm">{formattedPrice}</Text>
        </div>
      </div>
    </div>
  );
}
