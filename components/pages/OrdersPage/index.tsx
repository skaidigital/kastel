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
import { TD } from '@/components/shared/TD';
import { TH } from '@/components/shared/TH';
import { LangValues, ROUTES } from '@/data/constants';
import { getOrderCursors } from '@/lib/shopify/customer/getOrderCursors';
import { getOrders } from '@/lib/shopify/customer/getOrders';
import { capitalizeFirstLetter, cn, formatDate, getOrderIcon } from '@/lib/utils';
import { ShoppingBagIcon } from '@heroicons/react/20/solid';
import { Suspense } from 'react';

interface Props {
  currentPage: number;
  lang: LangValues;
}

export async function OrdersPage({ currentPage, lang }: Props) {
  const lastCursor = await getOrderCursors(currentPage);
  const correctCursor = currentPage === 1 ? undefined : lastCursor;
  const { account_page: dictionary } = await getDictionary();
  const { orders, pageInfo } = await getOrders(correctCursor);
  console.log({ orders });

  const hasOrders = orders && orders.length > 0;

  return (
    <>
      <AccountPageHeader lang={lang} pageTitle={dictionary.order} className="lg:hidden" />
      {hasOrders && (
        <div className="grid lg:col-span-7">
          <AccountPageHeader
            lang={lang}
            pageTitle={dictionary.order}
            className="col-span-7 hidden lg:block"
          />
          <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0 ">
            <div className="overflow-x-auto lg:grow ">
              <table className="lg:w-full">
                <thead className="border bg-brand-sand">
                  <tr>
                    <TH>{dictionary.order}</TH>
                    <TH>{dictionary.date}</TH>
                    <TH>{dictionary.status_payment}</TH>
                    <TH>{dictionary.status_shipping}</TH>
                    <TH className="text-right">{dictionary.total}</TH>
                  </tr>
                </thead>
                <tbody className="divide-brand-border divide-y">
                  {orders?.map((order, index) => (
                    <tr key={order.id} className="border-b border-brand-light-grey">
                      <TD className={cn('py-3', index === 0 && 'pl-6')}>
                        <CustomLink
                          href={`${ROUTES.ORDER_DETAILS}/${extractGid(order.id)}`}
                          className="underline"
                        >
                          {order.name}
                        </CustomLink>
                      </TD>
                      <TD className="py-3 pl-6">{formatDate(order.createdAt)}</TD>
                      <TD className="py-3 pl-6">
                        <Badge
                          size="xs"
                          variant={getOrderFinancialStatusBadgeVariant(order.financialStatus)}
                          className="flex items-center gap-x-1"
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
                          className="flex items-center gap-x-1"
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
              <Suspense>
                <Pagination
                  hasNextPage={pageInfo?.hasNextPage}
                  hasPreviousPage={pageInfo?.hasPreviousPage}
                  className="mt-7 flex "
                />
              </Suspense>
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
