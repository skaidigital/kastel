import {
  formatPrice,
  getOrderFinancialStatusBadgeVariant,
  getOrderFullfillmentStatusBadgeVariant
} from '@/app/[market]/[lang]/(site)/shopify/utils';
import { getDictionary } from '@/app/dictionaries';
import { BackButton } from '@/components/BackButton';
import { Badge } from '@/components/Badge';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { TD } from '@/components/shared/TD';
import { TH } from '@/components/shared/TH';
import { ROUTES } from '@/data/constants';
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
    <Section label="order-details" srHeading="Order details" className="px-6 md:px-12 lg:px-20">
      <BackButton href={ROUTES.ACCOUNT} className="mb-5">
        {dictionary.order_overview}
      </BackButton>
      <div className="mb-5 flex items-center space-x-3 lg:mb-10">
        <Heading size="md">
          {dictionary.order}
          {order.name}
        </Heading>
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
      <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-20 lg:space-y-0">
        <table className="h-fit w-fit lg:w-full">
          <thead>
            <tr>
              <TH className="pl-0 md:pl-2">{dictionary.product}</TH>
              <TH className="text-center">{dictionary.quantity}</TH>
              <TH className="pr-0 text-right">{dictionary.price}</TH>
            </tr>
          </thead>
          <tbody className="max-h-fit divide-y divide-brand-border">
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
        <div className="w-full space-y-14 pt-2 lg:max-w-40">
          <div className="space-y-5">
            <Heading as="h2" size="xs">
              {dictionary.summary}
            </Heading>
            <dl className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <dt className="text-sm">{dictionary.subtotal}</dt>
                <dt className="text-sm">{subtotal}</dt>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">{dictionary.shipping}</dt>
                <dt className="text-sm">{shipping}</dt>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">{dictionary.tax}</dt>
                <dt className="text-sm">{tax}</dt>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">{dictionary.total}</dt>
                <dt className="text-sm">{total}</dt>
              </div>
            </dl>
          </div>
          <div className="space-y-5">
            <Heading as="h2" size="xs">
              {dictionary.delivery_address}
            </Heading>
            <div className="flex flex-col space-y-2">
              {order.shippingAddress.formatted.map((line) => (
                <Text key={line} size="sm">
                  {line}
                </Text>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
