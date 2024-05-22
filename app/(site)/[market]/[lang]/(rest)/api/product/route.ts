/* eslint-disable no-unused-vars */
import { HEADLESS_PUBLICATION_ID, MarketValues } from '@/data/constants';
import { env } from '@/env';
import {
  serializePublicationInput,
  serializeShopifyProductInputCreate,
  serializeShopifyProductInputUpdate
} from '@/lib/api/serializers';
import {
  PriceRangeV2Schema,
  ProductSyncSchema,
  ProductSyncValidator,
  ProductUpdateSchema,
  ValidatePayloadBody
} from '@/lib/api/types';
import { adminClient } from '@/lib/sanity/adminClient';
import { getProductFromSanityQuery } from '@/lib/sanity/getProductData';
import {
  CreateProductInShopify,
  PublishProductToSalesChannel,
  UpdateProductInShopify
} from '@/lib/shopify/mutations';
import { isCreatedInShopify } from '@/lib/shopify/queries';
import { sanityQuery } from 'lib/sanity';
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

//todo Check on response types, for best toast experience in Sanity
//todo Adjust status codes
//todo Test to see if sync works with new product schema

//! Remove when testing is done
//? Is this still relevant?
// export const config = {
//   api: {
//     bodyParser: true
//   }
// };

const STATUS_CODES = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 200,
  OK: 200
};

// request: NextRequest, res: Response
export async function POST(request: NextRequest, res: Response) {
  // Your secret key (this should be stored in environment variables)
  const secretKey = env.NEXT_PUBLIC_PRODUCT_SYNC_SECRET_KEY;

  // Check for the secret key in the request header
  const requestKey = request.headers.get('x-secret-key');

  if (requestKey !== secretKey) {
    return new Response(JSON.stringify({ success: false }), { status: STATUS_CODES.UNAUTHORIZED });
  }

  const body = await request.json();

  if (!body) {
    return new Response(JSON.stringify({ success: false }), { status: STATUS_CODES.BAD_REQUEST });
  }

  try {
    const validatedBody = ValidatePayloadBody.safeParse(body);

    if (!validatedBody.success) {
      return new Response(JSON.stringify({ success: false, data: validatedBody.error }), {
        status: STATUS_CODES.BAD_REQUEST
      });
    }

    const { _id, market } = validatedBody.data;

    const sanityProductResponse = await getProductFromSanity(_id, market);

    if (!sanityProductResponse.success) {
      return new Response(JSON.stringify({ success: false }), {
        status: STATUS_CODES.BAD_REQUEST
      });
    }

    sanityProductResponse.data.market = market;

    const productSyncedToShopify = await syncProductToShopify(sanityProductResponse.data);

    if (!productSyncedToShopify.success) {
      return new Response(JSON.stringify({ success: false, data: productSyncedToShopify }), {
        status: STATUS_CODES.BAD_REQUEST
      });
    }
    revalidateTag(`product:${sanityProductResponse.data.slug}`);

    setTimeout(() => {
      revalidateTag(`product:${sanityProductResponse.data.slug}`);
    }, 2000);

    return new Response(JSON.stringify({ success: true, data: productSyncedToShopify }), {
      status: STATUS_CODES.OK
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, data: err }), {
      status: STATUS_CODES.BAD_REQUEST
    });
  }
}

async function syncProductToShopify(product: ProductSyncSchema) {
  // Check if product is created in Shopify
  const isCreatedInShopifyResponse: boolean = await isCreatedInShopify(product._id, product.gid);

  if (!isCreatedInShopifyResponse) {
    // Create product in Shopify
    const createProductResponse: any = await createProductInShopify(product);

    // If success, update Sanity with Shopify id
    if (!createProductResponse.success) {
      return {
        success: false,
        message: 'Product not created in Shopify',
        data: createProductResponse
      };
    }
    const { createdProduct } = createProductResponse;
    await setProductIdAndGidInSanity(product, createdProduct);
    const largestDiscount = getLargestDiscount(createdProduct);

    await setPriceRangeSanity(
      product._id,
      product.market,
      createdProduct.createdAt,
      largestDiscount,
      createdProduct.priceRangeV2
    );

    console.log('Product created in Shopify');
    return { success: true, message: 'Product created in Shopify', data: createProductResponse };
  }

  // Update product in Shopify
  const updateProductResponse = await updateProductInShopify(product);

  const { updatedProduct } = updateProductResponse;
  await setProductIdAndGidInSanity(product, updatedProduct);

  if (updateProductResponse.updatedProduct && updateProductResponse.updatedProduct.priceRangeV2) {
    const largestDiscount = getLargestDiscount(updatedProduct);

    console.log(largestDiscount);

    await setPriceRangeSanity(
      product._id,
      product.market,
      updateProductResponse.updatedProduct.createdAt,
      largestDiscount,
      updateProductResponse.updatedProduct.priceRangeV2
    );
  }
  return { success: true, data: updateProductResponse };
}

async function setProductIdAndGidInSanity(product: ProductSyncSchema, productResponse: any) {
  const { type, market, _id } = product;
  const firstVariantId = productResponse.variants.nodes[0].id;

  const productId = productResponse.id;
  const gid = productId;

  const gidKey = `gid_${market}`;
  const variantGidKey = `variantGid_${market}`;

  const input = {
    [gidKey]: gid,
    [variantGidKey]: type === 'SIMPLE' ? firstVariantId : null
  };

  const transaction = adminClient.transaction();

  transaction.patch(_id, (p) => p.set(input));

  if (type !== 'SIMPLE') {
    productResponse.variants.nodes.forEach((variant: any) => {
      const variantInput = {
        [gidKey]: variant.id
      };

      // find sanity _id
      const sanityId = product.variants.find((v) => v.sku === variant.sku)?._id;

      if (sanityId) {
        transaction.patch(sanityId, (p) => p.set(variantInput));
      }
    });
  }

  const response = await transaction.commit();
  console.log('response', response);

  return response;
}

async function setPriceRangeSanity(
  _id: string,
  market: string | undefined | null,
  createdAt: string,
  largestDiscount: string | null,
  PriceRangeV2Schema?: PriceRangeV2Schema
) {
  if (!PriceRangeV2Schema || !market) {
    return;
  }
  const maxPriceKey = `maxVariantPrice_${market}`;
  const minPriceKey = `minVariantPrice_${market}`;
  const createdAtKey = `createdAt_${market}`;
  const largestDiscountKey = `largestDiscount_${market}`;

  const input = {
    [largestDiscountKey]: largestDiscount && Number(largestDiscount) > 0 ? largestDiscount : null,
    [createdAtKey]: createdAt,
    [maxPriceKey]: {
      _type: 'price',
      amount: Number(PriceRangeV2Schema.maxVariantPrice.amount),
      currencyCode: PriceRangeV2Schema.maxVariantPrice.currencyCode
    },
    [minPriceKey]: {
      _type: 'price',
      amount: Number(PriceRangeV2Schema.minVariantPrice.amount),
      currencyCode: PriceRangeV2Schema.minVariantPrice.currencyCode
    }
  };

  const response = await adminClient.patch(_id).set(input).commit();
  return response;
}

// ? Is this one supposed to return response even though there is a publishResponse below it in the function?
async function createProductInShopify(product: ProductSyncSchema) {
  const serializedShopifyCreateProduct = serializeShopifyProductInputCreate(product);

  const response = await CreateProductInShopify(serializedShopifyCreateProduct);

  if (!response.createdProduct) {
    return { success: false, message: 'No created product' };
  }
  if (!response.success) {
    return { success: false, message: 'No success' };
  }

  // Publish product
  const serializedInput = serializePublicationInput(
    response.createdProduct.id,
    HEADLESS_PUBLICATION_ID
  );

  const publishResponse = await PublishProductToSalesChannel(serializedInput);

  //TODO Validate response
  return response;
}

async function updateProductInShopify(product: ProductSyncSchema) {
  const serializedShopifyUpdateProduct = serializeShopifyProductInputUpdate(product);

  const response = await UpdateProductInShopify(serializedShopifyUpdateProduct);

  return response;
}

async function getProductFromSanity(_id: string, market: MarketValues) {
  const query = getProductFromSanityQuery(market);

  const variables = { id: _id };

  const data = await sanityQuery<ProductSyncSchema>({
    query,
    variables,
    validator: ProductSyncValidator
  });

  return data;
}

function getLargestDiscount(product: ProductUpdateSchema | null) {
  const variants = product?.variants?.nodes;

  if (!variants) {
    return null;
  }

  // find the largest discount between price and compareAtPrice
  const largestDiscount = variants.reduce((acc, variant) => {
    if (!variant.compareAtPrice) {
      return acc;
    }

    const price = Number(variant.price);
    const compareAtPrice = Number(variant.compareAtPrice);

    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;

    return discount > acc ? discount : acc;
  }, 0);

  return largestDiscount.toFixed(2);
}
