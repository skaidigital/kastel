import { formatPrice } from '@/app/api/shopify/utils';
import EditItemQuantityButton from '@/components/shared/Cart/EditQuantityButton';
import RemoveFromCartButton from '@/components/shared/Cart/RemoveFromCartButton';
import { Money, SelectedOption, ShopifyImage } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';

interface Props {
  lineId: string;
  variantId: string;
  title: string;
  option1?: SelectedOption;
  option2?: SelectedOption;
  option3?: SelectedOption;
  quantity: number;
  subtotal: Money;
  totalAmount: Money;
  image: ShopifyImage;
  variantDescription?: string;
  className?: string;
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
  totalAmount,
  image,
  className
}: Props) {
  const formattedPrice = formatPrice(totalAmount);
  const formattedSubTotal = formatPrice(subtotal);
  const isDiscounted = totalAmount.amount !== subtotal.amount;

  return (
    <div
      className={cn(
        'flex w-full gap-x-4 rounded-project border-b border-brand-light-grey bg-white px-4 py-3 lg:px-6 lg:py-4',
        className
      )}
    >
      <div className="w-20">
        <AspectRatio ratio={3 / 4} className="relative">
          <Image
            src={image.url}
            alt={image.altText || "Ooops, we're missing an alt text!"}
            fill
            sizes="120px"
            className="absolute rounded-project object-cover"
          />
        </AspectRatio>
      </div>
      <div className="flex w-full flex-col justify-between text-xs">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-1">
            <h3 className="font-medium">{title}</h3>
            <div className="flex flex-col gap-y-1">
              {option1 && (
                <span>
                  {option1.name}: {option1.value}
                </span>
              )}
              {option2 && (
                <span>
                  {option2.name}: {option2.value}
                </span>
              )}
              {option3 && (
                <span>
                  {option3.name}: {option3.value}
                </span>
              )}
            </div>
          </div>
          <RemoveFromCartButton itemId={lineId} />
        </div>
        <div className="flex justify-between">
          <div>
            <span className="text-brand-mid-grey">{formattedPrice}</span>
            {isDiscounted && (
              <span className="ml-3 text-brand-mid-grey line-through">{formattedSubTotal}</span>
            )}
          </div>
          <div className="flex h-8 items-center border border-brand-light-grey">
            <EditItemQuantityButton
              lineId={lineId}
              variantId={variantId}
              quantity={quantity}
              type="minus"
            />
            <p className="w-6 text-center">
              <span className="w-full text-[14px] leading-[14px]">{quantity}</span>
            </p>
            <EditItemQuantityButton
              lineId={lineId}
              variantId={variantId}
              quantity={quantity}
              type="plus"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
