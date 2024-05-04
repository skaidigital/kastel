import {
  formatPrice,
  getOrderFinancialStatusBadgeVariant,
  getOrderFullfillmentStatusBadgeVariant
} from '@/app/api/shopify/utils';
import { getDictionary } from '@/app/dictionaries';
import { Badge } from '@/components/Badge';
import { AccountPageHeader } from '@/components/account/AccountPageHeader';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { LangValues } from '@/data/constants';
import { getOrder } from '@/lib/shopify/customer/getOrder';
import { capitalizeFirstLetter, cn, getOrderIcon } from '@/lib/utils';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  orderId: string;
  lang: LangValues;
}

export async function OrderDetailsPage({ orderId, lang }: Props) {
  const order = await getOrder(orderId);
  const { order_details_page: dictionary } = await getDictionary({ lang });

  const subtotal = formatPrice(order.subtotal);
  const shipping = formatPrice(order.totalShipping);
  const tax = formatPrice(order.totalTax);
  const total = formatPrice(order.totalPrice);

  const fulfillmentStatus = order.fulfillments?.nodes[0]?.status;

  const trackingUrl = order.fulfillments?.nodes?.at(0)?.trackingInformation?.at(0)?.url;

  return (
    <div className="grid gap-4 lg:col-span-7">
      <div>
        <AccountPageHeader lang="en" pageTitle={'#1008'} className="mb-2" />
        <div className="mb-5 flex items-center space-x-3 lg:mb-10">
          <div className="flex space-x-2">
            <Badge
              size="xs"
              className="flex items-center gap-x-1"
              variant={getOrderFinancialStatusBadgeVariant(order.financialStatus)}
            >
              {getOrderIcon(getOrderFinancialStatusBadgeVariant(order.financialStatus))}
              {capitalizeFirstLetter(order.financialStatus)}
            </Badge>
            <Badge
              className="flex items-center gap-x-1"
              size="xs"
              variant={getOrderFullfillmentStatusBadgeVariant(fulfillmentStatus)}
            >
              {getOrderIcon(getOrderFullfillmentStatusBadgeVariant(fulfillmentStatus))}
              {capitalizeFirstLetter(fulfillmentStatus || dictionary.order_not_shipped)}
            </Badge>
            {trackingUrl && (
              <Badge size="xs" className="flex items-center gap-x-1" variant="neutral">
                <Link href={trackingUrl} target="_blank">
                  {dictionary.track_your_package}
                </Link>
                <ArrowTopRightIcon className="size-3 text-brand-mid-grey" />
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <ItemContainer className="h-fit lg:col-span-4 lg:row-start-2">
        <div className="flex flex-col gap-y-4">
          <Heading as="h2" className="text-md normal-case">
            {dictionary.product}
          </Heading>
          <div className="flex flex-col gap-y-4">
            {order.lineItems.edges.map((lineItem, index) => {
              const title = lineItem.node.title;
              const variantTitle = lineItem.node.variantTitle;
              const quantity = lineItem.node.quantity;
              const currentPrice = formatPrice(lineItem.node.currentTotalPrice);
              const originalPrice = formatPrice(lineItem.node.totalPrice);
              const hasDiscount = currentPrice !== originalPrice;

              const image = lineItem.node.image;

              return (
                <div key={title} className="flex gap-x-3">
                  {image && (
                    <div className="w-16">
                      <div className="aspect-h-4 aspect-w-3 relative">
                        <Image
                          src={image.url}
                          alt={image.altText}
                          fill
                          className="absolute h-full w-full rounded-[2px] object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex w-full flex-col gap-y-1 text-xs">
                    <div className="flex justify-between font-medium">
                      <span>{title}</span>
                      <div>
                        {hasDiscount && <span className="mr-4 line-through">{originalPrice}</span>}
                        <span>{currentPrice}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      {variantTitle && <span>{variantTitle}</span>}
                      <span>Qty: {quantity}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ItemContainer>

      {/* Summary and all that */}
      <div className="grid gap-4 lg:col-span-3 lg:row-start-2">
        <ItemContainer className="space-y-4 p-6">
          <Heading as="h2" className="text-md normal-case">
            {dictionary.summary}
          </Heading>
          <dl className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-brand-mid-grey">{dictionary.subtotal}</dt>
              <dd className="text-sm font-medium">{subtotal}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-brand-mid-grey">{dictionary.shipping}</dt>
              <dd className="text-sm font-medium">{shipping}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-brand-mid-grey">{dictionary.tax}</dt>
              <dd className="text-sm font-medium">{tax}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-brand-mid-grey">{dictionary.total}</dt>
              <dd className="text-sm font-medium">{total}</dd>
            </div>
          </dl>
        </ItemContainer>
        <ItemContainer className="space-y-4 p-6">
          <Heading as="h2" className="text-md normal-case">
            {dictionary.delivery_address}
          </Heading>
          <div className="flex flex-col space-y-2">
            {order.shippingAddress.formatted.map((line) => (
              <Text key={line} size="sm" className="text-brand-mid-grey">
                {line}
              </Text>
            ))}
          </div>
        </ItemContainer>
      </div>
    </div>
  );
}

function ItemContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('w-full rounded-[4px] border border-brand-light-grey p-6', className)}>
      {children}
    </div>
  );
}
