import productFragment from '../fragments/product'

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`

export const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`

export const getProductByShopifyId = /* GraphQL */ `
  query getProductByShopifyId($id: ID!, $namespace: String!, $key: String!) {
    product(id: $id) {
      id
      metafield(namespace: $namespace, key: $key) {
        key
        value
      }
    }
  }
`

export const getProductsByShopifyId = /* GraphQL */ `
  query getProductsByShopifyId($ids: String!) {
    products(first: 100, query: $ids) {
      nodes {
        id
        totalInventory
        variants(first: 20) {
          nodes {
            title
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`

export const getStockForProductVariant = /* GraphQL */ `
  query getStockForProductVariant($id: ID!) {
    productVariant(id: $id) {
      inventoryQuantity
    }
  }
`
