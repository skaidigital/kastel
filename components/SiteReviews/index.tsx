import { SiteReviewsLayout } from '@/components/SiteReviews/Layout'
import { getServiceReview } from '@/components/lipscore/hooks'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

export async function SiteReviews() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['siteReviews'],
    queryFn: getServiceReview
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SiteReviewsLayout />
    </HydrationBoundary>
  )
}
