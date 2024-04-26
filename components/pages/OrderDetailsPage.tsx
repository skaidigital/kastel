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
import { TD } from '@/components/shared/TD';
import { TH } from '@/components/shared/TH';
import { getOrder } from '@/lib/shopify/customer/getOrder';
import { cn } from '@/lib/utils';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  orderId: string;
}

export async function OrderDetailsPage({ orderId }: Props) {
  const order = await getOrder(orderId);
  const { order_details_page: dictionary } = await getDictionary();

  const subtotal = formatPrice(order.subtotal);
  const shipping = formatPrice(order.totalShipping);
  const tax = formatPrice(order.totalTax);
  const total = formatPrice(order.totalPrice);

  const fulfillmentStatus = order.fulfillments?.nodes[0]?.status;

  const trackingUrl = order.fulfillments?.nodes?.at(0)?.trackingInformation?.at(0)?.url;

  return (
    <div className="grid gap-4 lg:col-span-7">
      {/* Header */}
      <div>
        <AccountPageHeader lang="en" pageTitle={'#1008'} />
        <div className="mb-5 flex items-center space-x-3 lg:mb-10">
          <div className="space-x-2">
            <Badge variant={getOrderFinancialStatusBadgeVariant(order.financialStatus)}>
              {order.financialStatus}
            </Badge>
            <Badge variant={getOrderFullfillmentStatusBadgeVariant(fulfillmentStatus)}>
              {fulfillmentStatus || dictionary.order_not_shipped}
            </Badge>
          </div>
        </div>
        {trackingUrl && (
          <div className="mb-5">
            <Link href={trackingUrl} target="blank" className="group flex items-center space-x-1">
              <Text className="transition-all duration-200 ease-in-out group-hover:mr-1">
                {dictionary.track_your_package}
              </Text>
              <ArrowTopRightIcon className="h-4 w-4 text-brand-mid-grey" />
            </Link>
          </div>
        )}
      </div>

      {/* Products */}
      <ItemContainer className="lg:col-span-4 lg:row-start-2">
        <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-20 lg:space-y-0">
          <table className="h-fit w-fit lg:w-full">
            <thead>
              <tr>
                <TH className="pl-0 md:pl-2">{dictionary.product}</TH>
                <TH className="text-center">{dictionary.quantity}</TH>
                <TH className="pr-0 text-right">{dictionary.price}</TH>
              </tr>
            </thead>
            <tbody className="divide-brand-border max-h-fit divide-y">
              {order.lineItems.edges.map((lineItem, index) => {
                const name = lineItem.node.name;
                const quantity = lineItem.node.quantity;
                const currentPrice = formatPrice(lineItem.node.currentTotalPrice);
                const originalPrice = formatPrice(lineItem.node.totalPrice);
                const hasDiscount = currentPrice !== originalPrice;

                const image = lineItem.node.image;

                return (
                  <tr key={name}>
                    <TD className={cn('flex items-center space-x-3', index === 0 && 'pl-0')}>
                      {image && (
                        <div className="w-20">
                          <Image
                            src={image.url}
                            alt={image.altText}
                            width={image.width}
                            height={image.height}
                            className="rounded-project"
                          />
                        </div>
                      )}
                      <span>{name}</span>
                    </TD>
                    <TD className="pr-0 text-center">{quantity}</TD>
                    <TD className="pr-0 text-right">
                      {hasDiscount && <span className="mr-4 line-through">{originalPrice}</span>}
                      <span>{currentPrice}</span>
                    </TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
