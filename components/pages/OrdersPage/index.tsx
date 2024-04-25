import {
  extractGid,
  formatPrice,
  getOrderFinancialStatusBadgeVariant,
  getOrderFullfillmentStatusBadgeVariant
} from '@/app/api/shopify/utils';
import { getDictionary } from '@/app/dictionaries';
import { Badge } from '@/components/Badge';
import { CustomLink } from '@/components/CustomLink';
import { Pagination } from '@/components/Pagination';
import { AccountPageHeader } from '@/components/account/AccountPageHeader';
import { EmptyState } from '@/components/account/EmptyState';
import { Text } from '@/components/base/Text';
import { TD } from '@/components/shared/TD';
import { TH } from '@/components/shared/TH';
import { ROUTES } from '@/data/constants';
import { getOrderCursors } from '@/lib/shopify/customer/getOrderCursors';
import { getOrders } from '@/lib/shopify/customer/getOrders';
import { cn, formatDate } from '@/lib/utils';
import { ShoppingBagIcon } from '@heroicons/react/20/solid';
import { CheckIcon, ChevronLeftIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Props {
  currentPage: number;
}

export async function OrdersPage({ currentPage }: Props) {
  const lastCursor = await getOrderCursors(currentPage);
  const correctCursor = currentPage === 1 ? undefined : lastCursor;
  const { account_page: dictionary } = await getDictionary();
  const { orders, pageInfo } = await getOrders(correctCursor);
  const hasOrders = orders && orders.length > 0;

  return (
    <>
      <AccountPageHeader pageTitle={dictionary.order} className="lg:hidden" />
      {hasOrders && (
        <div className="grid lg:col-span-7">
          <CustomLink href={ROUTES.ACCOUNT} className="mb-1 flex items-center gap-x-2">
            <ChevronLeftIcon className="size-4" />
            <Text size="sm" className="text-brand-mid-grey">
              Account
            </Text>
          </CustomLink>
          <h1 className="mb-8 text-heading-md font-bold">{dictionary.recent_orders}</h1>
          <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0 ">
            <div className="overflow-x-auto lg:grow ">
              <table className="lg:w-full">
                <thead className="border bg-brand-sand">
                  <tr>
                    <TH className="py-3 pl-6 text-xs font-medium">{dictionary.order}</TH>
                    <TH className="py-3 pl-6 text-xs font-medium">{dictionary.date}</TH>
                    <TH className="py-3 pl-6 text-xs font-medium">{dictionary.status_payment}</TH>
                    <TH className="py-3 pl-6 text-xs font-medium">{dictionary.status_shipping}</TH>
                    <TH className="py-3 pr-6 text-right text-xs font-medium">{dictionary.total}</TH>
                  </tr>
                </thead>
                <tbody className="divide-brand-border divide-y">
                  {orders?.map((order, index) => (
                    <tr key={order.id} className="border-b border-brand-light-grey">
                      <TD className={cn('py-3', index === 0 && 'pl-6')}>
                        <Link href={`${ROUTES.ORDER_DETAILS}/${extractGid(order.id)}`}>
                          {order.name}
                        </Link>
                      </TD>
                      <TD className="py-3 pl-6">{formatDate(order.createdAt)}</TD>
                      <TD className="py-3 pl-6">
                        <Badge
                          size="xs"
                          variant={getOrderFinancialStatusBadgeVariant(order.financialStatus)}
                          className="flex items-start gap-1 py-0.5"
                        >
                          {getOrderIcon(getOrderFinancialStatusBadgeVariant(order.financialStatus))}
                          {capitalizeFirstLetter(order.financialStatus)}
                        </Badge>
                      </TD>
                      <TD className="py-3 pl-6">
                        <Badge
                          size="xs"
                          variant={getOrderFullfillmentStatusBadgeVariant(
                            order.fulfillments?.nodes[0]?.status
                          )}
                          className="flex items-start gap-1 py-0.5"
                        >
                          {getOrderIcon(
                            getOrderFullfillmentStatusBadgeVariant(
                              order.fulfillments?.nodes[0]?.status
                            )
                          )}
                          {order.fulfillments?.nodes[0]?.status || dictionary.order_not_shipped}
                        </Badge>
                      </TD>
                      <TD className="py-3 pr-6 text-right">{formatPrice(order.totalPrice)}</TD>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                hasNextPage={pageInfo?.hasNextPage}
                hasPreviousPage={pageInfo?.hasPreviousPage}
                className="mt-7 flex "
              />
            </div>
          </div>
        </div>
      )}
      {!hasOrders && (
        <div className="grid lg:col-span-6">
          <EmptyState
            icon={<ShoppingBagIcon className="size-8" />}
            heading="You haven't placed any orders yet"
            text="Start shopping"
            href={ROUTES.HOME}
          />
        </div>
      )}
    </>
  );
}

function getOrderIcon(variant: string) {
  switch (variant) {
    case 'orderDanger':
      return <XMarkIcon className="h-3 w-3" />;
    case 'orderPending':
      return <ClockIcon className="h-3 w-3" />;
    case 'orderSuccess':
      return <CheckIcon className="h-3 w-3" />;
    default:
      return <ClockIcon className="h-3 w-3" />;
  }
}

function capitalizeFirstLetter(string: string) {
  const loweCased = string.toLowerCase();
  const firstLetter = loweCased.charAt(0).toUpperCase();
  const rest = loweCased.slice(1);

  return firstLetter + rest;
}
