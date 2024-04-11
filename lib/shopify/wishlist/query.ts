export const getWishlistQuery = /* GraphQL */ `
  query getWishlist($token: String!, $key: String!, $namespace: String!) {
    customer(customerAccessToken: $token) {
      metafield(key: $key, namespace: $namespace) {
        id
        key
        value
      }
    }
  }
`;

export const deleteWishlistQuery = /* GraphQL */ `
  mutation metafieldDelete($id: ID!) {
    metafieldDelete(input: { id: $id }) {
      deletedId
      userErrors {
        field
        message
      }
    }
  }
`;

export const metafieldsSetMutation = /* GraphQL */ `
  mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        key
        namespace
        value
        createdAt
        updatedAt
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;
