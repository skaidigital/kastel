import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export function TD({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn('px-6 py-4 text-xs text-brand-mid-grey', className)}>{children}</td>
}
