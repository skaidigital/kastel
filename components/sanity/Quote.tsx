import { SanityImage } from '@/components/sanity/SanityImage'
import { QuoteProps } from '@/lib/sanity/types'
import { cn } from '@/lib/utils'

interface Props {
  quote: QuoteProps
  type: 'normal' | 'natureLab'
}

export function Quote({ quote, type }: Props) {
  return (
    <figure
      className={cn(
        'mx-auto mb-10 mt-12 flex flex-col gap-y-4',
        type === 'normal' && 'max-w-[--blog-post-container-md] '
      )}
    >
      <blockquote
        className={cn(
          'text-balance ',
          type === 'normal'
            ? 'text-lg lg:text-xl'
            : 'text-nature-lab-lg font-nature-lab-body text-nature-lab-dark-grey'
        )}
      >
        {quote.quote && <>&ldquo;{quote.quote}&ldquo;</>}
      </blockquote>
      {quote.showAuthor && (
        <figcaption className="flex items-center gap-x-4">
          {quote.authorType === 'internal' && quote.author?.image && (
            <SanityImage
              width={56}
              height={56}
              image={quote.author.image}
              className="h-14 w-14 object-cover"
            />
          )}
          <div className="flex flex-col gap-y-0.5">
            <span
              className={cn(
                type === 'normal'
                  ? 'text-sm text-gray-500'
                  : 'text-nature-lab-xs text-nature-lab-dark-grey font-nature-lab-body'
              )}
            >
              {quote.authorType === 'internal'
                ? quote.author?.name || 'Anonymous'
                : `– ${quote.authorName || 'Anonymous'}`}
            </span>

            {quote.authorType === 'internal' && quote.author?.role && (
              <span
                className={cn(
                  type === 'normal'
                    ? 'text-sm text-gray-500'
                    : 'text-nature-lab-xs text-brand-mid-grey font-nature-lab-body'
                )}
              >
                {quote.author.role}
              </span>
            )}
          </div>
        </figcaption>
      )}
    </figure>
  )
}
