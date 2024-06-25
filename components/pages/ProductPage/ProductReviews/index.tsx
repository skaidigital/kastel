'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion'
import { Button } from '@/components/Button'
import { getProductReviews } from '@/components/lipscore/hooks'
import { useProductPageContext } from '@/components/pages/ProductPage/Context'
import { ReviewItem } from '@/components/pages/ProductPage/ProductReviews/ReviewItem'
import { LangValues, PRODUCT_PAGE_REVIEWS_PAGE_SIZE } from '@/data/constants'
import { useBaseParams } from '@/lib/hooks/useBaseParams'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface Props {
  lipscoreProductId: string
}

export function ProductReviews({ lipscoreProductId }: Props) {
  const [page, setPage] = useState(1)
  const { lang } = useBaseParams()
  const { showProductReviews, setShowProductReviews } = useProductPageContext()
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (showProductReviews) {
      setActiveItem('reviews')
    }
    if (!showProductReviews) {
      setActiveItem(undefined)
    }
  }, [showProductReviews])

  const { data, error, isFetching } = useQuery({
    queryKey: ['productReviews', page],
    queryFn: () => getProductReviews(lipscoreProductId, page),
    placeholderData: (prev) => prev
  })

  if (error) {
    console.error(error)
    return null
  }

  const pageSize = PRODUCT_PAGE_REVIEWS_PAGE_SIZE
  const hasPreviousPage = page > 1
  const hasNextPage = data && data?.length >= pageSize

  const reviewsString = getReviewsString(lang)
  const pageString = getPageString(lang)
  const previousString = getPreviousString(lang)
  const nextString = getNextString(lang)

  const toggleItem = (item: string) => {
    console.log({ item })

    setActiveItem((prevItem) => (prevItem === item ? undefined : item))
  }

  const handleValueChange = (value: string) => {
    setActiveItem(value)
    if (value === 'reviews') {
      setShowProductReviews(true)
    } else {
      setShowProductReviews(false)
    }
  }

  return (
    <div className="w-full">
      <Accordion
        type="single"
        id="reviews"
        collapsible
        value={activeItem}
        onValueChange={handleValueChange}
      >
        <AccordionItem value="reviews">
          <AccordionTrigger onClick={() => toggleItem('reviews')}>
            <h1>{reviewsString}</h1>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-y-10">
              {data?.map((review) => (
                <ReviewItem
                  key={review.created_at}
                  review={review}
                  className="border-b border-brand-light-grey pb-5"
                />
              ))}
            </ul>
            <div className="mt-6 flex flex-col items-center justify-between gap-10 lg:mt-10 lg:flex-row lg:gap-0">
              <span className="text-sm">
                {pageString}: {page}
              </span>
              <div className="flex items-center justify-center gap-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
                  isLoading={isFetching}
                  disabled={!hasPreviousPage || isFetching}
                >
                  {previousString}
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                  isLoading={isFetching}
                  disabled={!hasNextPage || isFetching}
                >
                  {nextString}
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

function getReviewsString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Reviews'
    case 'no':
      return 'Anmeldelser'
    default:
      return 'Reviews'
  }
}

function getPageString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Page'
    case 'no':
      return 'Side'
    default:
      return 'Page'
  }
}

function getPreviousString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Previous'
    case 'no':
      return 'Forrige'
    default:
      return 'Previous'
  }
}

function getNextString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Next'
    case 'no':
      return 'Neste'
    default:
      return 'Next'
  }
}
