import { shopifyFetch } from '@/lib/shopify';

type ShopifyProductVariantOperation = {
  data: {
    node: {
      quantityAvailable: number;
    };
  };
  errors: any[];
  variables: {
    variantId: string;
  };
};

export const query = /* GraphQL */ `
  query getProductVariant($variantId: ID!) {
    node(id: $variantId) {
      ... on ProductVariant {
        quantityAvailable
      }
    }
  }
`;

export async function getProductVariantInventory(variantId: string): Promise<number | undefined> {
  if (!variantId) return undefined;

  const buffer = Buffer.from(variantId);
  const encodedString = buffer.toString('base64');

  const res = await shopifyFetch<ShopifyProductVariantOperation>({
    query,
    variables: { variantId: encodedString },
    cache: 'no-store'
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return res.body.data.node?.quantityAvailable || undefined;
}
