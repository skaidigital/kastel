export const productVariantBasedOnProduct = {
  id: 'product-variant-based-on-product',
  title: 'Variant basert på produkt',
  description: 'Lager variant tilknyttet et produkt',
  schemaType: 'productVariant',
  parameters: [{ name: '_id', type: 'string' }],
  value: (params: any) => ({
    parentProduct: { _type: 'reference', _ref: params._id }
  })
};
