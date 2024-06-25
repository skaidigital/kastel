'use client'

import { CarouselItem } from '@/components/Carousel'
import { TestimonialCarousel } from '@/components/SiteReviews/TestimonialCarousel'
import { Container } from '@/components/base/Container'
import { Section } from '@/components/base/Section'
import { getServiceReview } from '@/components/lipscore/hooks'
import { ReviewItem } from '@/components/pages/ProductPage/ProductReviews/ReviewItem'
import { LangValues } from '@/data/constants'
import { useBaseParams } from '@/lib/hooks/useBaseParams'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

export function SiteReviewsLayout() {
  const { data } = useQuery({
    queryKey: ['siteReviews'],
    queryFn: getServiceReview
  })
  const { lang } = useBaseParams()

  const formattedRating = Number(data?.rating)?.toFixed(1)

  const basedOnString = getBasedOnString(lang)
  const votesString = getVotesString(lang)

  return (
    <Section label="siteReviews" srHeading="Site reviews" size="sm">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-x-40">
          <div className="mb-20 flex flex-col gap-y-2 lg:mb-0">
            <div className="flex items-end gap-x-1">
              {formattedRating && (
                <span className="text-heading-2xl font-bold uppercase">{formattedRating}</span>
              )}
              <span className="text-heading-sm font-bold uppercase">/5</span>
            </div>
            <span className="text-md">
              {basedOnString} {data?.votes} {votesString}
            </span>
            <Image src="/images/lipscore-logo.png" alt="Lipscore logo" width={160} height={160} />
          </div>
          <div className="flex flex-col gap-y-6 lg:max-w-xl lg:gap-y-10">
            <TestimonialCarousel count={data?.reviews?.length || 0}>
              {data?.reviews?.map((review) => (
                <CarouselItem key={review.created_at} className="basis-full pl-0 ">
                  <ReviewItem review={review} />
                </CarouselItem>
              ))}
            </TestimonialCarousel>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function getBasedOnString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Based on'
    case 'no':
      return 'Basert på'
    default:
      return 'Based on'
  }
}

function getVotesString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'votes'
    case 'no':
      return 'stemmer'
    default:
      return 'votes'
  }
}
