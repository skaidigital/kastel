import { AddCommentForm } from '@/components/pages/nature-lab/Phase1BlogPost/AddCommentForm'
import { Comment } from '@/components/pages/nature-lab/Phase1BlogPost/Comment'
import { CommentProps } from '@/components/pages/nature-lab/Phase1BlogPost/hooks'
import { LangValues } from '@/data/constants'

interface Props {
  documentId: string
  slug: string
  lang: LangValues
  comments?: CommentProps[]
}

export function Comments({ documentId, slug, lang, comments }: Props) {
  const feedBackFromTheCommunityTranslation = getFeedBackFromTheCommunityTranslation(lang)

  return (
    <div className="mt-10 flex flex-col gap-y-5 lg:mt-20">
      <h2 className="text-balance font-nature-lab-heading text-nature-lab-heading-xs uppercase text-nature-lab-dark-grey lg:text-nature-lab-heading-md">
        {feedBackFromTheCommunityTranslation}
      </h2>
      {comments && (
        <div className="flex flex-col gap-y-2 divide-y divide-brand-light-grey">
          {comments?.map((comment) => (
            <Comment key={comment.id} comment={comment} className="py-4" />
          ))}
        </div>
      )}
      <AddCommentForm documentId={documentId} slug={slug} />
    </div>
  )
}

function getFeedBackFromTheCommunityTranslation(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Tilbakemelding fra samfunnet'
    case 'en':
      return 'Feedback from the community'
    default:
      return 'Feedback from the community'
  }
}
