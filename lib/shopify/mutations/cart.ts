import cartFragment from '../fragments/cart';

export const addToCartMutation = /* GraphQL */ `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const createCartMutation = /* GraphQL */ `
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const editCartItemsMutation = /* GraphQL */ `
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const cartAttributesUpdateMutation = /* GraphQL */ `
  mutation cartAttributesUpdate($cartId: ID!, $attributes: [AttributeInput!]!) {
    cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = /* GraphQL */ `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const applyDiscountToCartMutation = /* GraphQL */ `
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;

export const customerAccessTokenCreateMutation = /* GraphQL */ `
  mutation customerAccessTokenCreate($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;
