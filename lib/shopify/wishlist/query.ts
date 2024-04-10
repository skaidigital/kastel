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
