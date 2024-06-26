import { AddCommentForm } from '@/components/pages/nature-lab/Phase1BlogPost/AddCommentForm'
import { Comment } from '@/components/pages/nature-lab/Phase1BlogPost/Comment'
import {
  CommentProps,
  Phase1BlogPostPayload
} from '@/components/pages/nature-lab/Phase1BlogPost/hooks'
import { LangValues } from '@/data/constants'
import { portableTextNatureLabSerializer } from '@/lib/sanity/portableTextNatureLabSerializer'
import { PortableText } from '@portabletext/react'

interface Props {
  documentId: string
  description?: Phase1BlogPostPayload['commentsDescription']
  slug: string
  lang: LangValues
  comments?: CommentProps[]
}

export function Comments({ documentId, description, slug, lang, comments }: Props) {
  const feedBackFromTheCommunityTranslation = getFeedBackFromTheCommunityTranslation(lang)

  return (
    <div className="flex flex-col gap-y-5">
      <h2 className="text-balance font-nature-lab-heading text-nature-lab-heading-sm uppercase text-nature-lab-dark-grey lg:text-nature-lab-heading-md">
        {feedBackFromTheCommunityTranslation}
      </h2>
      {description && (
        <div className="noMarginFirstChild">
          <PortableText value={description} components={portableTextNatureLabSerializer} />
        </div>
      )}
      {comments && (
        <div className="flex flex-col gap-y-2 divide-y divide-neutral-300">
          {comments?.map((comment) => (
            <Comment key={comment.id} comment={comment} className="py-4" />
          ))}
        </div>
      )}
      <AddCommentForm documentId={documentId} slug={slug} className="mt-10" />
    </div>
  )
}

function getFeedBackFromTheCommunityTranslation(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Tilbakemeldinger fra dere'
    case 'en':
      return 'Feedback from the community'
    default:
      return 'Feedback from the community'
  }
}
