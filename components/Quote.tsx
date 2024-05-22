import { SanityImage } from '@/components/sanity/SanityImage';
import { QuoteProps } from '@/lib/sanity/types';

interface Props {
  quote: QuoteProps;
}

export function Quote({ quote }: Props) {
  return (
    <figure className="mx-auto mb-10 mt-12 flex max-w-[--blog-post-container-md] flex-col gap-y-4">
      <blockquote className="text-balance text-lg lg:text-xl">
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
            {quote.authorType === 'internal'
              ? quote.author?.name || 'Anonymous'
              : `– ${quote.authorName || 'Anonymous'}`}
            {quote.authorType === 'internal' && quote.author?.role && (
              <span className="text-sm text-gray-500">{quote.author.role}</span>
            )}
          </div>
        </figcaption>
      )}
    </figure>
  );
}
