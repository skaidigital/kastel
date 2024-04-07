import { customerAccountFetch } from '@/lib/shopify/customer';
import { z } from 'zod';

const shopifyResponseValidator = z.object({
  data: z.object({
    customer: z.object({
      orders: z.object({
        edges: z.array(
          z.object({
            cursor: z.string()
          })
        )
      })
    })
  }),
  variables: z.object({
    first: z.number()
  })
});

type ShopifyResponse = z.infer<typeof shopifyResponseValidator>;

const query = /* GraphQL */ `
  query ($first: Int!) {
    customer {
      orders(first: $first, reverse: true) {
        edges {
          cursor
        }
      }
    }
  }
`;

// TODO add pagination
// TODO type / zod validate properly
// TODO set first to pageNubmer * 10 once testing is done
export async function getOrderCursors(pageNumber: number) {
  const PAGE_SIZE = 1;
  const first = pageNumber * PAGE_SIZE + 1;

  const res = await customerAccountFetch<ShopifyResponse>({
    query: query,
    cache: 'no-store',
    variables: {
      first
    }
  });

  const cursors = res.body.data.customer.orders.edges;
  const lastCursor = cursors[cursors.length - 2]?.cursor;

  return lastCursor;
}
