'use server'

import {
  AddCommentProps,
  addCommentValidator
} from '@/components/pages/nature-lab/Phase1BlogPost/AddCommentForm/hooks'
import { CACHE_TAGS } from '@/data/constants'
import { adminClient } from '@/lib/sanity/adminClient'
import { revalidateTag } from 'next/cache'

interface Props {
  documentId: string
  data: AddCommentProps
  slug: string
}

export async function createComment({ documentId, data, slug }: Props) {
  try {
    const validatedData = addCommentValidator.safeParse(data)

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Invalid data'
      }
    }

    const { name, email, text } = validatedData.data

    await adminClient
      .patch(documentId)
      .setIfMissing({ comments: [] })
      .append('comments', [
        {
          name,
          email,
          text
        }
      ])
      .commit({
        autoGenerateArrayKeys: true
      })

    revalidateTag(`${CACHE_TAGS.NATURE_LAB.PHASE_1_BLOG_POST}:${slug}`)

    return {
      success: true,
      message: 'Comment added successfully'
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Error adding comment'
    }
  }
}
