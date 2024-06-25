import { adminClient } from '@/lib/sanity/adminClient'
import { shopifyAdminQuery } from '@/lib/shopify/admin'
import { removeProductGid, removeVariantGid } from '@/lib/shopify/helpers'

export async function GET() {
  try {
    const response = await getProducts()

    const serializedData = serializeData(response)

    const filteredData = serializedData.filter((product: any) => product.status_no === 'ACTIVE')
    const fileredData2 = filteredData.filter((product: any) => product._id !== '8618935648485')

    const data = fileredData2

    const transaction = adminClient.transaction()

    syncToSanityHandler(data, transaction)

    const transactionResponse = await transaction.commit()
    console.log(transactionResponse)

    const responseData = JSON.stringify(fileredData2)

    return new Response(responseData, {
      status: 200
    })
  } catch (error: any) {
    return new Response(error, {
      status: 500
    })
  }
}

function syncToSanityHandler(data: any, transaction: any) {
  data.forEach((product: any) => {
    const syncProduct = JSON.parse(JSON.stringify(product))
    delete syncProduct.variants
    if (product.type === 'VARIABLE') {
      // delete keys that are not needed
      delete syncProduct.price_no
      delete syncProduct.discountedPrice_no
      delete syncProduct.variantGid_no
      delete syncProduct.sku
    }
    if (product.type === 'SIMPLE') {
      if (product.discountedPrice_no === null || product.discountedPrice_no === 0) {
        delete syncProduct.discountedPrice_no
      }
      delete syncProduct.options
    }
    transaction.createIfNotExists(syncProduct)

    if (product.variants) {
      product.variants.forEach((variant: any) => {
        const syncVariant = JSON.parse(JSON.stringify(variant))

        if (!variant.option2) {
          delete syncVariant.option2
        }

        if (!variant.option3) {
          delete syncVariant.option3
        }

        if (!variant.discountedPrice_no) {
          delete syncVariant.discountedPrice_no
        }

        delete syncVariant.title_no

        transaction.createIfNotExists(syncVariant)
      })
    }
  })
}

async function getProducts() {
  const productData: any[] = []
  let hasNextPage = true
  let cursor = null

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
  `
    console.log('Fetching products, new round')

    const response = await shopifyAdminQuery(query, {}, 'no-store')

    const products = response?.data?.products

    hasNextPage = products?.pageInfo.hasNextPage
    cursor = products?.pageInfo.endCursor

    if (products?.edges.length > 0) {
      productData.push(...products?.edges)
    }
  }
  return productData
}

function serializeData(data: any) {
  return data.map((product: any) => {
    const sanityParentId = removeProductGid(product.node.id)
    const isVariableProduct = product.node.variants.nodes.length > 1

    return {
      _id: sanityParentId,
      _type: 'product',
      internalTitle: product.node.title,
      title: {
        _type: 'i18n.string',
        no: product.node.title
      },
      slug_no: {
        _type: 'slug',
        current: product.node.handle
      },
      markets: ['no'],
      status_no: product.node.status,
      allowBackorders: false,
      gid_no: product.node.id,
      variantGid_no: !isVariableProduct ? product.node.variants.nodes[0].id : null,
      price_no: !isVariableProduct ? Number(getPrice(product.node.variants.nodes[0])) : null,
      discountedPrice_no: !isVariableProduct
        ? Number(getDiscountedPrice(product.node.variants.nodes[0]))
        : null,
      maxVariantPrice_no: {
        _type: 'price',
        amount: Number(product.node.priceRangeV2.maxVariantPrice.amount),
        currencyCode: 'NOK'
      },
      minVariantPrice_no: {
        _type: 'price',
        amount: Number(product.node.priceRangeV2.minVariantPrice.amount),
        currencyCode: 'NOK'
      },
      sku: !isVariableProduct ? product.node.variants.nodes[0].sku : null,
      options: isVariableProduct ? getParentOptionRef({ options: product.node.options[0] }) : null,
      variants: serializeVariants(product.node.variants.nodes, sanityParentId),
      trackStock: product.node.tracksInventory,
      type: isVariableProduct ? 'VARIABLE' : 'SIMPLE'
    }
  })
}

function serializeVariants(variants: any, parentId: string) {
  if (!variants || variants.length < 2) return null

  return variants.map((variant: any) => {
    const discountedPrice = getDiscountedPrice(variant)

    return {
      _id: removeVariantGid(variant.id),
      _type: 'productVariant',
      sku: variant.sku,
      title_no: variant.title,

      price_no: Number(getPrice(variant)),
      gid_no: variant.id,
      hideInShop_no: false,
      option1: getOptionReference({
        optionValue: variant.selectedOptions[0]?.value,
        optionType: variant.selectedOptions[0]?.name
      }),
      option2: getOptionReference({
        optionValue: variant.selectedOptions[1]?.value,
        optionType: variant.selectedOptions[1]?.name
      }),
      option3: getOptionReference({
        optionValue: variant.selectedOptions[2]?.value,
        optionType: variant.selectedOptions[2]?.name
      }),
      discountedPrice_no: discountedPrice ? Number(discountedPrice) : null,
      parentProduct: {
        _type: 'reference',
        _ref: parentId
      }
    }
  })
}

function getPrice(variant: any) {
  return variant.compareAtPrice !== null && variant.compareAtPrice !== '0.00'
    ? variant.compareAtPrice
    : variant.price
}

function getDiscountedPrice(variant: any) {
  return variant.compareAtPrice !== null && variant.compareAtPrice !== '0.00' ? variant.price : null
}

interface OptionProps {
  optionValue: string
  optionType: string
}

function getOptionReference({ optionValue, optionType }: OptionProps) {
  if (!optionValue) return null
  if (!optionType) return null
  if (optionType === 'Size') {
    return {
      _type: 'reference',
      _ref: getOptionRef(optionValue)
    }
  }

  return { _type: 'FEIL', _ref: optionValue }
}

//! Prod
function getOptionRef(optionValue: string) {
  switch (optionValue) {
    case '36':
      return 'af15ea6a-c981-401c-a4c9-0bb69bc62119'
    case '37':
      return '484e99cb-dbc4-4454-8245-27136b0557e8'
    case '38':
      return 'b3b9a8ef-6a8e-474f-b3b7-74c5597bac3e'
    case '39':
      return '6f2a2d40-7474-4c82-b2fb-66f20b4de083'
    case '40':
      return '7ca73c4e-b3f1-48fb-9c91-dce4a32d1cc6'
    case '41':
      return '8a741f24-bfbf-423c-b0ae-b85cd22dc882'
    case '42':
      return 'b6741f66-4b83-46f3-afcf-bbb5623a9d60'
    case '43':
      return '694d42eb-d71b-4733-8af9-2e55f05ba54d'
    case '44':
      return 'd60a39b2-cd44-4d06-8ec7-052b697efed7'
    case '45':
      return '58e9e3a9-427a-47a5-845b-af20e07ae4c4'
    case '46':
      return '4572f640-96f7-40ef-89aa-ee8018b9e8d7'
    default:
      return null
  }
}

// function getOptionRef(optionValue: string) {
//   switch (optionValue) {
//     case '36':
//       return '4a1a1096-833a-40e8-a047-190073b7d115';
//     case '37':
//       return '05d1b827-eac5-483c-9f26-a847214afd73';
//     case '38':
//       return '0bfa3f0c-3262-4823-b3d3-ca08f4df8055';
//     case '39':
//       return '35c5ccec-82b3-4ab6-9435-8e46202c4720';
//     case '40':
//       return '7e5976d3-c618-4de2-9b52-2298291f0955';
//     case '41':
//       return '6f3365eb-5921-4e10-b7c5-67aa6dd31865';
//     case '42':
//       return 'f21349dc-e12a-4be6-90fb-450b07513592';
//     case '43':
//       return '1c521456-71c8-4cf1-95af-851613d83ee1';
//     case '44':
//       return '044cef44-2602-4c0c-ba44-4b5b29845688';
//     case '45':
//       return 'fa0418d8-7587-4a42-a214-956c4c99f43d';
//     case '46':
//       return '3b5cd92e-bdc8-4b53-b349-4bd386987942';
//     default:
//       return null;
//   }
// }

interface ParentOptionProps {
  options: {
    name: string
    values: string[]
  }
}

function getParentOptionRef({ options }: ParentOptionProps) {
  const optionRef = parentOptionRef(options?.name)

  if (!optionRef) return null

  if (options.name === 'Size') {
    const keyCounter = Math.floor(Math.random() * 10000)

    return [
      {
        _key: String(keyCounter),
        _type: 'option',
        optionType: {
          _type: 'reference',
          _ref: optionRef
        },
        options: options?.values.map((optionValue: string) => {
          const keyCounter = Math.floor(Math.random() * 10000)
          return {
            _key: String(keyCounter),
            _type: 'option',
            _ref: getOptionRef(optionValue)
          }
        })
      }
    ]
  }
}

function parentOptionRef(optionValue: string) {
  switch (optionValue) {
    case 'Size':
      return 'c4758b40-69c1-4960-8f6d-126e684c859d'
    default:
      return null
  }
}

// function parentOptionRef(optionValue: string) {
//   switch (optionValue) {
//     case 'Size':
//       return 'c6a76064-0956-4a02-a424-1fd974d01412';
//     default:
//       return null;
//   }
// }
