const storekey = process.env.NEXT_PUBLIC_JUNIP_STORE_KEY || ''

const baseUrl = 'https://api.juniphq.com/'
const reviewBaseUrl = 'https://forms.juniphq.com/'

export async function getAllProductsJunip() {
  const URL = baseUrl + `v1/products`

  const options = {
    method: 'GET',
    headers: {
      'Junip-Store-Key': storekey
    }
  }

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json()
    })
    return data
  } catch (error) {
    console.error('Error getAllProductReviewsJunip: ', error)
  }
}

export async function getProductReviewsJunip(productId: string) {
  try {
    const products = await getAllProductsJunip()
    const junipProduct = products?.products?.find((product: any) => {
      return product.remote_id === productId
    })
    const junipProductId = junipProduct?.id

    const URL =
      baseUrl +
      `v1/product_reviews?include=customer&filter[product_ids][]=${junipProductId}&page[size]=5&sort[field]=featured&sort[order]=desc`

    const options = {
      method: 'GET',
      headers: {
        'Junip-Store-Key': storekey
      }
    }

    const data = await fetch(URL, options).then((response) => {
      return response.json()
    })
    return data
  } catch (error) {
    console.error('Error getProductReviewJunip: ', error)
  }
}

export async function getProductReviewsTESTJunip(productId: string, props: any) {
  try {
    const products = await getAllProductsJunip()
    const junipProduct = await products?.products?.find((product: any) => {
      return product.remote_id === productId
    })
    const junipProductId = await junipProduct?.id

    const URL =
      baseUrl +
      `v1/product_reviews?include=customer&filter[product_ids][]=${junipProductId}&page[size]=5${props}`

    const options = {
      method: 'GET',
      headers: {
        'Junip-Store-Key': storekey
      }
    }

    const data = await fetch(URL, options).then((response) => {
      return response.json()
    })
    return data
  } catch (error) {
    console.error('Error getProductReviewJunip: ', error)
  }
}

export async function getProductReviewsNextJunip(productId: string, props: any, page: any) {
  try {
    const products = await getAllProductsJunip()
    const junipProduct = products?.products?.find((product: any) => {
      return product.remote_id === productId
    })
    const junipProductId = junipProduct?.id

    const URL =
      baseUrl +
      `v1/product_reviews?include=customer&filter[product_ids][]=${junipProductId}${props}&page[after]=${page}`

    const options = {
      method: 'GET',
      headers: {
        'Junip-Store-Key': storekey
      }
    }
    const data = await fetch(URL, options).then((response) => {
      return response.json()
    })
    return data
  } catch (error) {
    console.error('Error getProductReviewJunip: ', error)
  }
}

export async function getProductReviewLinkJunip(productId: string) {
  const URL = reviewBaseUrl + `review/onsite/product?store_key=${storekey}&product_id=${productId}`
  return URL
}
