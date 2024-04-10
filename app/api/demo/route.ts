import { shopifyAdminQuery } from '@/lib/shopify/admin';

export async function GET(request: Request) {
  try {
    const response = await getProducts();

    const serializedData = serializeData(response);

    const responseData = JSON.stringify(serializedData);

    return new Response(responseData, {
      status: 200
    });
  } catch (error: any) {
    return new Response(error, {
      status: 500
    });
  }
}

async function getProducts() {
  const productData: any[] = [];
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const query: string = /* GraphQL */ `
    query {
      products(first: 25, after: ${cursor ? `"${cursor}"` : null}) {
        edges {
          node {
            id
            title
            handle
            status
            tracksInventory
            options(first: 20) {
              id
              name
              values
            }
            variants(first: 20) {
              nodes {
                id
                title
                sku
                selectedOptions {
                  name
                  value
                }
                price
                compareAtPrice
              }
            }
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;
    console.log('Fetching products, new round');

    const response = await shopifyAdminQuery(query, {}, 'no-store');

    const products = response?.data?.products;

    hasNextPage = products?.pageInfo.hasNextPage;
    cursor = products?.pageInfo.endCursor;

    if (products?.edges.length > 0) {
      productData.push(...products?.edges);
    }
  }
  return productData;
}

function serializeData(data: any) {
  return data.map((product: any) => {
    return {
      id: product.node.id,
      _type: 'product',
      internalTitle: product.node.title,
      title_no: product.node.title,
      handle: product.node.handle,
      markets: ['no'],
      status_no: product.node.status,
      options: product.node.options,
      variants: product.node.variants.nodes,
      priceRangeV2: product.node.priceRangeV2,
      trackStock: product.node.tracksInventory,
      type: product.node.variants.nodes.length > 1 ? 'VARIABLE' : 'SIMPLE'
    };
  });
}

function serializeVariants(variants: any, parentId: string) {
  return variants.map((variant: any) => {
    return {
      id: variant.id,
      title_no: variant.title,
      _type: 'productVariant',
      sku: variant.sku,
      price_no: getPrice(variant),
      discountedPrice_no: getDiscountedPrice(variant),
      gid_no: variant.id,
      selectedOptions: variant.selectedOptions,
      parentProduct: {
        _type: 'reference',
        _ref: parentId
      }
    };
  });
}

function getPrice(variant: any) {
  return variant.compareAtPrice !== null && variant.compareAtPrice !== '0.00'
    ? variant.compareAtPrice
    : variant.price;
}

function getDiscountedPrice(variant: any) {
  return variant.compareAtPrice !== null && variant.compareAtPrice !== '0.00'
    ? variant.price
    : null;
}
