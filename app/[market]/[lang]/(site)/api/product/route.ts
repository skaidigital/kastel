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

export async function POST(request: NextRequest, res: Response) {
  // Your secret key (this should be stored in environment variables)
  const secretKey = env.NEXT_PUBLIC_PRODUCT_SYNC_SECRET_KEY;

  console.log('in post');
  console.log(secretKey);

  // Check for the secret key in the request header
  const requestKey = request.headers.get('x-secret-key');
  console.log('requestKey', requestKey);

  if (requestKey !== secretKey) {
    console.log('requestKey', requestKey);

    return new Response(JSON.stringify({ success: false }), { status: STATUS_CODES.UNAUTHORIZED });
  }

  const body = await request.json();
  console.log('body', body);

  if (!body) {
    return new Response(JSON.stringify({ success: false }), { status: STATUS_CODES.BAD_REQUEST });
  }

  try {
    const validatedBody = ValidatePayloadBody.safeParse(body);
    console.log('validatedBody', validatedBody);

    if (!validatedBody.success) {
      console.log('validatedBody.error', validatedBody.error);

      return new Response(JSON.stringify({ success: false, data: validatedBody.error }), {
        status: STATUS_CODES.BAD_REQUEST
      });
    }

    const { _id, market } = validatedBody.data;
    console.log('_id', _id);

    const sanityProductResponse = await getProductFromSanity(_id, market);
    console.log('sanityProductResponse', sanityProductResponse);

    if (!sanityProductResponse.success) {
      console.log('sanityProductResponse', sanityProductResponse);

      return new Response(JSON.stringify({ success: false, data: sanityProductResponse }), {
        status: STATUS_CODES.BAD_REQUEST
      });
    }

    sanityProductResponse.data.market = market;
    console.log('sanityProductResponse.data', sanityProductResponse.data);

    const productSyncedToShopify = await syncProductToShopify(sanityProductResponse.data);
    console.log('productSyncedToShopify', productSyncedToShopify);

    if (!productSyncedToShopify.success) {
      return new Response(JSON.stringify({ success: false, data: productSyncedToShopify }), {
        status: STATUS_CODES.BAD_REQUEST
      });
    }

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
  console.log('isCreatedInShopifyResponse', isCreatedInShopifyResponse);

  if (!isCreatedInShopifyResponse) {
    console.log('Product not created in Shopify');

    // Create product in Shopify
    const createProductResponse: any = await createProductInShopify(product);
    console.log('createProductResponse', createProductResponse);

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

    return { success: true, message: 'Product created in Shopify', data: createProductResponse };
  }
  console.log('Product created in Shopify');

  // Update product in Shopify
  const updateProductResponse = await updateProductInShopify(product);
  console.log('updateProductResponse', updateProductResponse);

  const { updatedProduct } = updateProductResponse;
  await setProductIdAndGidInSanity(product, updatedProduct);

  if (updateProductResponse.updatedProduct && updateProductResponse.updatedProduct.priceRangeV2) {
    await setPriceRangeSanity(
      product._id,
      product.market,
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
  console.log('input', input);

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
  PriceRangeV2Schema?: PriceRangeV2Schema
) {
  if (!PriceRangeV2Schema || !market) {
    return;
  }
  const maxPriceKey = `maxPrice_${market}`;
  const minPriceKey = `minPrice_${market}`;
  const input = {
    [maxPriceKey]: {
      amount: Number(PriceRangeV2Schema.maxVariantPrice.amount),
      currencyCode: PriceRangeV2Schema.maxVariantPrice.currencyCode
    },
    [minPriceKey]: {
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

  console.log(publishResponse);

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
