import { CommentProps } from '@/components/pages/nature-lab/Phase1BlogPost/hooks'
import { cn } from '@/lib/utils'

interface Props {
  comment: CommentProps
  className?: string
}

export function Comment({ comment, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-y-4', className)}>
      <span className="font-nature-lab-heading text-nature-lab-heading-xs uppercase text-nature-lab-dark-grey">
        {comment.name}
      </span>
      <p className="font-nature-lab-body text-nature-lab-md text-brand-mid-grey">{comment.text}</p>
    </div>
  )
}
