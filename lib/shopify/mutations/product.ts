import { ERROR_FRAGMENT } from '../fragments';

const productFragment = /* GraphQL */ `
      product {
        id
        handle
        createdAt
        priceRangeV2 {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 20) {
          nodes {
            id
            sku
            price
				    compareAtPrice
            inventoryItem {
              id
            }
          }
        }
      }
      `;

export const createProductMutation = /* GraphQL */ `
  mutation CreateProduct($input: ProductInput!, $media: [CreateMediaInput!]) {
    productCreate(input: $input, media: $media) {
      product {
      ${productFragment}
      ${ERROR_FRAGMENT}
    }
  }
`;

export const updateProductMutation = /* GraphQL */ `
  mutation UpdateProduct($input: ProductInput!) {
    productUpdate(input: $input) {
      ${productFragment}
      ${ERROR_FRAGMENT}
    }
  }
`;

export const publishablePublishMutation = /* GraphQL */ `
  mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
    publishablePublish(id: $id, input: $input) {
      publishable {
        publicationCount
      }
      shop {
        name
      }
      userErrors {
        field
        message
      }
    }
  }
`;
