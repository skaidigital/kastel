import { TEMPLATES } from '@/data/constants';
import { customerAccountFetch } from '@/lib/shopify/customer';
import { FulfillmentStatus, OrderFinancialStatus } from '@/lib/shopify/customer/types';
import { MONEY_FRAGMENT } from '@/lib/shopify/fragments';
import { Money } from '@/lib/shopify/types';

type ShopifyResponse = {
  data: {
    order: {
      id: string;
      name: string;
      createdAt: string;
      financialStatus: OrderFinancialStatus;
      subtotal: Money;
      totalShipping: Money;
      totalTax: Money;
      totalPrice: Money;
      fulfillments?: {
        nodes: {
          status: FulfillmentStatus;
          trackingInformation: {
            url?: string;
          }[];
        }[];
      };
      shippingAddress: {
        formatted: string[];
      };
      lineItems: {
        edges: {
          node: {
            id: string;
            sku: string;
            name: string;
            variantTitle: string;
            title: string;
            quantity: number;
            image: {
              url: string;
              height: number;
              width: number;
              altText: string;
            };
            currentTotalPrice: Money;
            totalPrice: Money;
          };
        }[];
      };
    };
  };
  variables: {
    id: string;
  };
};

const customerOrderQuery = /* GraphQL */ `
  query getOrder($id: ID!) {
    order(id: $id) {
      id
      name
      createdAt
      financialStatus
      subtotal {
        ...Money
      }
      totalShipping {
        ...Money
      }
      totalTax {
        ...Money
      }
      totalPrice {
        ...Money
      }
      fulfillments(first: 10) {
        nodes {
          status
          trackingInformation {
            url
          }
        }
      }
      shippingAddress {
        formatted
      }
      lineItems(first: 10) {
        edges {
          node {
            id
            sku
            name
            variantTitle
            title
            quantity
            image {
              url
              height
              width
              altText
            }
            currentTotalPrice {
              ...Money
            }
            totalPrice {
              ...Money
            }
          }
        }
      }
    }
  }
  ${MONEY_FRAGMENT}
`;

export async function getOrder(id: string) {
  const formattedId = `${TEMPLATES.SHOPIFY.ORDER}/${id}`;

  const res = await customerAccountFetch<ShopifyResponse>({
    query: customerOrderQuery,
    cache: 'no-store',
    variables: {
      id: formattedId
    }
  });

  return res.body.data.order;
}
