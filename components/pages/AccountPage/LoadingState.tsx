import { LoadingSpinner } from '@/components/LoadingSpinner'

export function AccountPageLoadingState() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center">
      <LoadingSpinner className="size-10 lg:hidden" />
    </div>
  )
}
