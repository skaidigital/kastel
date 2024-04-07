import { ERROR_FRAGMENT } from '../fragments';

export const createProductMutation = /* GraphQL */ `
  mutation CreateProduct($input: ProductInput!, $media: [CreateMediaInput!]) {
    productCreate(input: $input, media: $media) {
      product {
        id
        handle
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
            inventoryItem {
              id
            }
          }
        }
      }
      ${ERROR_FRAGMENT}
    }
  }
`;

export const updateProductMutation = /* GraphQL */ `
  mutation UpdateProduct($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        handle
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
            inventoryItem {
              id
            }
          }
        }
      }
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
