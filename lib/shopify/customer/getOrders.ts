import { PageInfo } from '@/app/(site)/shopify/types';
import { ACCOUNT_PAGE_ORDERS_PAGE_SIZE } from '@/data/constants';
import { customerAccountFetch } from '@/lib/shopify/customer';
import { FulfillmentStatus, OrderFinancialStatus } from '@/lib/shopify/customer/types';
import { MONEY_FRAGMENT } from '@/lib/shopify/fragments';
import { Money } from '@/lib/shopify/types';

type ShopifyResponse = {
  data: {
    customer: {
      orders?: {
        pageInfo: PageInfo;
        nodes: {
          id: string;
          name: string;
          createdAt: string;
          currencyCode: string;
          totalPrice: Money;
          financialStatus: OrderFinancialStatus;
          fulfillments?: {
            nodes: {
              status: FulfillmentStatus;
            }[];
          };
        }[];
      };
    };
  };
  variables: {
    first: number;
    last?: number;
    startCursor?: string;
    endCursor?: string;
  };
};

const customerOrdersQuery = /* GraphQL */ `
  query ($first: Int!, $last: Int, $startCursor: String, $endCursor: String) {
    customer {
      orders(first: $first, last: $last, after: $startCursor, before: $endCursor, reverse: true) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        nodes {
          id
          name
          createdAt
          currencyCode
          totalPrice {
            ...Money
          }
          financialStatus
          fulfillments(first: 10) {
            nodes {
              status
            }
          }
        }
      }
    }
  }
  ${MONEY_FRAGMENT}
`;

export async function getOrders(lastCursor?: string) {
  const res = await customerAccountFetch<ShopifyResponse>({
    query: customerOrdersQuery,
    cache: 'no-store',
    variables: {
      first: ACCOUNT_PAGE_ORDERS_PAGE_SIZE,
      startCursor: lastCursor
    }
  });

  const orders = res.body.data.customer.orders?.nodes;
  const pageInfo = res.body.data.customer.orders?.pageInfo;

  return { orders, pageInfo };
}
