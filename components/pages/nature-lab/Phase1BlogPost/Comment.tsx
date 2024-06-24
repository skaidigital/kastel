import { Phase1BlogPostPayload } from '@/components/pages/nature-lab/Phase1BlogPost/hooks';
import { cn } from '@/lib/utils';

interface Props {
  comment: Phase1BlogPostPayload['comments'][0];
  className?: string;
}

export function Comment({ comment, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-y-2', className)}>
      <div className="flex gap-x-2">
        <div className="flex flex-col gap-y-1">
          <span className="text-sm text-brand-dark-grey">{comment.name}</span>
          <span className="text-sm text-brand-mid-grey">{comment.email}</span>
        </div>
      </div>
      <p className="text-sm text-brand-mid-grey">{comment.text}</p>
    </div>
  );
}
