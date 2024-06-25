import { getDictionary } from '@/app/dictionaries'
import { ProductPageLayout } from '@/components/pages/ProductPage/ProductPageLayout'
import { Product, getProductQuery, productValidator } from '@/components/pages/ProductPage/hooks'
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants'
import { loadProductMetadata } from '@/lib/sanity/getProductMetadata'
import { generateStaticSlugsProducts } from '@/lib/sanity/loader/generateStaticSlugs'
import { nullToUndefined } from '@/lib/sanity/nullToUndefined'
import { loadQuery } from '@/lib/sanity/store'
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage'
import { SearchParams } from '@/lib/types'
import '@/styles/hideSmile.css'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { ZodError } from 'zod'

export const dynamic = 'force-static'

export async function generateStaticParams({
  params: { lang, market }
}: {
  params: { lang: LangValues; market: MarketValues }
}) {
  const slugs = await generateStaticSlugsProducts(lang, market)

  return slugs
}

function loadProduct({
  slug,
  market,
  lang,
  gender = 'female'
}: {
  slug: string
  market: MarketValues
  lang: LangValues
  gender?: 'male' | 'female'
}) {
  const query = getProductQuery({ market, lang, gender })

  return loadQuery<Product | null>(
    query,
    { slug },
    { next: { tags: [`${CACHE_TAGS.PRODUCT}${slug}`] } }
  )
}

interface Props {
  params: { slug: string; market: MarketValues; lang: LangValues }
  searchParams?: SearchParams
}

export default async function SlugProductPage({ params, searchParams }: Props) {
  const slug = params.slug
  const market = params.market
  const lang = params.lang
  const isDraftMode = draftMode().isEnabled
  const activeGender = 'female'

  try {
    const initial = await loadProduct({
      slug,
      market,
      lang,
      gender: activeGender
    })

    const { product_page: dictionary } = await getDictionary({ lang })

    if (!initial.data) {
      notFound()
    }

    const productWithoutNullValues = nullToUndefined(initial.data)

    const validatedProduct = isDraftMode
      ? productWithoutNullValues
      : productValidator.parse(productWithoutNullValues)

    return (
      <ProductPageLayout
        data={validatedProduct}
        dictionary={dictionary}
        searchParams={searchParams}
        market={market}
        lang={lang}
      />
    )
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach((issue) => {
        console.log(
          `Error at ${issue.path.join(' -> ')}: ${issue.message} (validator: productValidator)`
        )
      })
    } else {
      console.error('Unexpected error:', error)
    }
    return notFound()
  }
}

export async function generateMetadata({
  params: { slug, market, lang }
}: {
  params: { slug: string; market: MarketValues; lang: LangValues }
}): Promise<Metadata> {
  const metadata = await loadProductMetadata({
    market,
    lang,
    slug
  })

  const title = metadata?.metaTitle
  const description = metadata?.metaDescription
  const shouldIndex = !metadata?.noIndex
  const shouldFollow = !metadata?.noFollow
  const ogImage = metadata?.ogImage
  const ogImageUrl = ogImage ? urlForOpenGraphImage(ogImage) : undefined

  return {
    ...(title && { title }),
    ...(description && { description }),
    ...(ogImageUrl && {
      openGraph: {
        images: [ogImageUrl]
      }
    }),
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow
      }
    }
  }
}
