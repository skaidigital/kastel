import { MARKET, MarketValues } from 'data/constants';
import { z } from 'zod';

// market union type
export const marketType = z.union([z.literal(MARKET.no.id), z.literal(MARKET.eu.id)]);

export const ValidatePayloadBody = z.object({
  _id: z.string(),
  market: marketType
});

export const productTypes: Record<string, typeUnionSchema> = {
  simple: 'SIMPLE',
  variable: 'VARIABLE'
};

const typeUnion = z.union([z.literal(productTypes.simple), z.literal(productTypes.variable)]);

const ShopifyProductStatus = z.union([
  z.literal('ACTIVE'),
  z.literal('ARCHIVED'),
  z.literal('DRAFT')
]);

const ProductSyncOptionsValidator = z.object({
  title: z.string(),
  variants: z.array(z.string())
});

const ProductSyncImageValidator = z.object({
  originalSource: z.string(),
  altText: z.string().optional().nullable(),
  mediaContentType: z.string()
});

const VariantSyncValidator = z.object({
  _id: z.string().uuid(),
  sku: z.string(),
  price: z.number(),
  discountedPrice: z.number().optional().nullable(),
  barcode: z.string().optional().nullable(),
  option1: z.string().optional().nullable(),
  option2: z.string().optional().nullable(),
  option3: z.string().optional().nullable()
});

const ProductSyncBaseValidator = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  image: ProductSyncImageValidator,
  status: ShopifyProductStatus,
  trackStock: z.boolean(),
  allowBackorders: z.boolean().optional().nullable(),
  type: typeUnion,
  gid: z.string().optional().nullable(),
  market: z.string().optional().nullable(),
  //! Added temp
  options: z.array(ProductSyncOptionsValidator).optional().nullable(),
  variants: z.array(VariantSyncValidator)
});

// Add more fields to SimpleProductSyncValidator
const SimpleProductSyncValidator = z.object({
  type: z.literal('SIMPLE'),
  variants: z.array(VariantSyncValidator)
});

const VariableProductSyncValidator = z.object({
  type: z.literal('VARIABLE'),
  options: z.array(ProductSyncOptionsValidator).optional().nullable(),
  variants: z.array(VariantSyncValidator)
});

const MergedSimpleProductValidator = ProductSyncBaseValidator.merge(SimpleProductSyncValidator);
const MergedVariableProductValidator = ProductSyncBaseValidator.merge(VariableProductSyncValidator);

// export const ProductSyncValidator = z.discriminatedUnion('type', [
//   MergedSimpleProductValidator,
//   MergedVariableProductValidator
// ]);

export const ProductSyncValidator = ProductSyncBaseValidator;

export const ProductExsistInShopifyValidator = z.object({
  product: z.object({
    id: z.string(),
    metafield: z.object({
      key: z.string(),
      value: z.string()
    })
  })
});

const VariantUpdateValidator = z.object({
  id: z.string(),
  sku: z.string(),
  inventoryItem: z.object({
    id: z.string()
  })
});

const MoneyValidator = z.object({
  amount: z.string(),
  currencyCode: z.string()
});

const PriceRangeV2Validator = z.object({
  maxVariantPrice: MoneyValidator,
  minVariantPrice: MoneyValidator
});

export const ProductUpdateValidator = z.object({
  id: z.string(),
  handle: z.string(),
  priceRangeV2: PriceRangeV2Validator.optional().nullable(),
  variants: z.object({
    nodes: z.array(VariantUpdateValidator)
  })
});

export type ProductUpdateSchema = z.infer<typeof ProductUpdateValidator>;
export type PriceRangeV2Schema = z.infer<typeof PriceRangeV2Validator>;
export type VariantSyncValidator = z.infer<typeof VariantSyncValidator>;
export type typeUnionSchema = 'SIMPLE' | 'VARIABLE';
export type SimpleProductSyncSchema = z.infer<typeof MergedSimpleProductValidator>;
export type VariableProductSyncSchema = z.infer<typeof MergedVariableProductValidator>;
export type ProductSyncSchema = z.infer<typeof ProductSyncValidator>;
export type TitlesForMarkets = {
  [K in MarketValues as `title_${K}`]?: string | null;
};

export type ProductUpdateSchemaResponse = {
  updatedProduct: ProductUpdateSchema | null;
};
