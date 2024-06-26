import { CommentProps } from '@/components/pages/nature-lab/Phase1BlogPost/hooks'
import { cn, formatDate } from '@/lib/utils'

interface Props {
  comment: CommentProps
  className?: string
}

export function Comment({ comment, className }: Props) {
  const firstName = comment.name.split(' ')[0]

  return (
    <div className={cn('flex flex-col gap-y-4', className)}>
      <div className="flex justify-between">
        <span className="font-nature-lab-body text-nature-lab-sm lg:text-nature-lab-md uppercase text-nature-lab-dark-grey">
          {firstName}
        </span>
        <span className="font-nature-lab-body text-nature-lab-sm lg:text-nature-lab-md uppercase text-nature-lab-dark-grey">
          {formatDate(String(comment.createdAt))}
        </span>
      </div>
      <p className="font-nature-lab-body text-nature-lab-md text-brand-mid-grey">{comment.text}</p>
    </div>
  )
}
