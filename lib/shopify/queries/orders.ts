import moneyFragment from '@/lib/shopify/fragments/money';

const orderFragment = /* GraphQL */ `
  fragment order on Order {
    id
    name
    currencyCode
    currentTotalPriceSet {
      ${moneyFragment}
    }
    displayFulfillmentStatus
    displyFinancialStatus
    createdAt
  }
`;

// export const getCollectionQuery = /* GraphQL */ `
//   query getCollection($handle: String!) {
//     collection(handle: $handle) {
//       ...collection
//     }
//   }
//   ${collectionFragment}
// `;

export const getOrders = /* GraphQL */ `
  query getOrders {
    orders(first: 100, sortKey: CREATED_AT) {
      edges {
        node {
          ...order
        }
      }
    }
  }
  ${orderFragment}
`;

// export const getCollectionProductsQuery = /* GraphQL */ `
//   query getCollectionProducts(
//     $handle: String!
//     $sortKey: ProductCollectionSortKeys
//     $reverse: Boolean
//   ) {
//     collection(handle: $handle) {
//       products(sortKey: $sortKey, reverse: $reverse, first: 100) {
//         edges {
//           node {
//             ...product
//           }
//         }
//       }
//     }
//   }
//   ${productFragment}
// `;
