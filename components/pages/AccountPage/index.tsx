import {
  extractGid,
  formatPrice,
  getOrderFinancialStatusBadgeVariant,
  getOrderFullfillmentStatusBadgeVariant
} from '@/app/(site)/[market]/[lang]/shopify/utils';
import { getDictionary } from '@/app/dictionaries';
import { Badge } from '@/components/Badge';
import { Pagination } from '@/components/Pagination';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { TD } from '@/components/shared/TD';
import { TH } from '@/components/shared/TH';
import { ROUTES } from '@/data/constants';
import { getOrderCursors } from '@/lib/shopify/customer/getOrderCursors';
import { getOrders } from '@/lib/shopify/customer/getOrders';
import { cn, formatDate } from '@/lib/utils';
import Link from 'next/link';

interface Props {
  currentPage: number;
}

export async function AccountPage({ currentPage }: Props) {
  const lastCursor = await getOrderCursors(currentPage);
  const correctCursor = currentPage === 1 ? undefined : lastCursor;
  const { account_page: dictionary } = await getDictionary();
  const { orders, pageInfo } = await getOrders(correctCursor);
  const hasOrders = orders && orders.length > 0;

  return (
    <Section label="my-account" srHeading="My account" className="pl-6 md:px-12 lg:px-20">
      <Heading className="mb-10" size="md">
        {dictionary.recent_orders}
      </Heading>
      <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0 ">
        <div className="overflow-x-auto lg:grow ">
          <table className="lg:w-full">
            <thead>
              <tr>
                <TH className="pl-0">{dictionary.order}</TH>
                <TH>{dictionary.date}</TH>
                <TH>{dictionary.status_payment}</TH>
                <TH>{dictionary.status_shipping}</TH>
                <TH className="pr-0 text-right">{dictionary.total}</TH>
              </tr>
            </thead>
            {hasOrders && (
              <tbody className="divide-brand-border divide-y">
                {orders?.map((order, index) => (
                  <tr key={order.id}>
                    <TD className={cn('underline', index === 0 && 'pl-0')}>
                      <Link href={`${ROUTES.ORDER_DETAILS}/${extractGid(order.id)}`}>
                        {order.name}
                      </Link>
                    </TD>
                    <TD>{formatDate(order.createdAt)}</TD>
                    <TD>
                      <Badge variant={getOrderFinancialStatusBadgeVariant(order.financialStatus)}>
                        {order.financialStatus}
                      </Badge>
                    </TD>
                    <TD>
                      <Badge
                        variant={getOrderFullfillmentStatusBadgeVariant(
                          order.fulfillments?.nodes[0]?.status
                        )}
                      >
                        {order.fulfillments?.nodes[0]?.status || dictionary.order_not_shipped}
                      </Badge>
                    </TD>
                    <TD className="pr-0 text-right">{formatPrice(order.totalPrice)}</TD>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {hasOrders && (
            <Pagination
              hasNextPage={pageInfo?.hasNextPage}
              hasPreviousPage={pageInfo?.hasPreviousPage}
              className="mt-10 flex justify-center"
            />
          )}
          {!hasOrders && (
            <div className="border-project border-brand-border mt-4 flex h-40 w-full items-center justify-center border">
              <Heading as="h2" size="sm">
                {dictionary.no_orders}
              </Heading>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
