import { NatureLabLandingPage } from '@/components/pages/nature-lab/NatureLabLandingPage'
import {
  NatureLabLandingPagePayload,
  getNatureLabLandingPageQuery
} from '@/components/pages/nature-lab/NatureLabLandingPage/hooks'
import { LangValues, MarketValues } from '@/data/constants'
import { loadMetadata } from '@/lib/sanity/getMetadata'
import { nullToUndefined } from '@/lib/sanity/nullToUndefined'
import { loadQuery } from '@/lib/sanity/store'
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage'
import { notFound } from 'next/navigation'
import { Metadata } from 'next/types'

export const dynamic = 'force-static'

function loadNatureLabLandingPage() {
  const query = getNatureLabLandingPageQuery()

  return loadQuery<NatureLabLandingPagePayload>(
    query,
    {},
    { next: { tags: ['natureLabLandingPage'] } }
  )
}

export default async function Page({
  params
}: { params: { lang: LangValues; market: MarketValues } }) {
  const { lang, market } = params
  const initial = await loadNatureLabLandingPage()

  if (!initial.data) {
    return notFound()
  }

  const pageWithoutNullValues = nullToUndefined(initial.data)

  return <NatureLabLandingPage data={pageWithoutNullValues} lang={lang} market={market} />
}

export async function generateMetadata({
  params: { lang }
}: {
  params: { lang: LangValues }
}): Promise<Metadata> {
  const metadata = await loadMetadata({
    lang,
    slug: 'nature-lab-landing-page',
    schemaType: 'natureLabLandingPage'
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
