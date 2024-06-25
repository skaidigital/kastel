'use client'

import { cn } from '@/lib/utils'
import { ExitIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

interface Props {
  className?: string
}

export function ExitDraftModeButton({ className }: Props) {
  const router = useRouter()
  function handleClick() {
    router.push('/api/disable-draft')
    router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-x-1 border border-brand-light-grey p-2 hover:border-brand-primary focus:border-brand-primary',
        className
      )}
    >
      <ExitIcon className="size-4" />
      <span className="text-xs">Exit draft mode</span>
    </button>
  )
}
