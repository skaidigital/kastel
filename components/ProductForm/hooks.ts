import { shopifyFetch } from '@/lib/shopify';

type ShopifyProductOperation = {
  data: {
    product: {
      availableForSale: boolean;
      totalInventory: number;
      priceRange: {
        minVariantPrice: {
          amount: string;
          currencyCode: string;
        };
        maxVariantPrice: {
          amount: string;
          currencyCode: string;
        };
      };
      variants: {
        edges: {
          node: {
            id: string;
            availableForSale: boolean;
            quantityAvailable: number;
          };
        }[];
      };
    };
  };
  errors: any[];
  variables: {
    id: string;
  };
};

export type ProductInventoryResponse = ShopifyProductOperation['data']['product'];

export const getProductInventoryQuery = /* GraphQL */ `
  query getProductById($id: ID!) {
    product(id: $id) {
      availableForSale
      totalInventory
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            availableForSale
            quantityAvailable
          }
        }
      }
    }
  }
`;

type ShopifyVariantsOperation = {
  data: {
    productVariants: {
      nodes: {
        sku: string;
        availableForSale: boolean;
        inventoryQuantity: number;
      }[];
    };
  };
  errors: any[];
  variables: {
    query: string;
  };
};

export const getProductVariantInventoryQuery = /* GraphQL */ `
  query getvariants($query: String!) {
    productVariants(first: 10, query: $query) {
      nodes {
        sku
        availableForSale
        inventoryQuantity
      }
    }
  }
`;

export async function getProductInventory(productId: string) {
  console.log('productId in getProductInventory', productId);

  if (!productId) return undefined;
  console.log('we have productId');

  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductInventoryQuery,
    variables: { id: productId },
    cache: 'no-store'
  });
  console.log('res in getProductInventory', res);

  return res.body?.data?.product || undefined;
}

export async function getProductVariantInventoryBySku(skus: string[]) {
  if (!skus) return undefined;

  const queryString = skus.map((sku) => `sku:${sku}`).join(' OR ');

  const res = await shopifyFetch<ShopifyVariantsOperation>({
    query: getProductVariantInventoryQuery,
    variables: { query: queryString },
    cache: 'no-store'
  });

  return res.body?.data?.productVariants?.nodes || undefined;
}
