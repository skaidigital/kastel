'use client'

import { Button } from '@/components/Button'
import { FormInput } from '@/components/form/FormInput'
import { createComment } from '@/components/pages/nature-lab/Phase1BlogPost/AddCommentForm/actions'
import {
  AddCommentProps,
  addCommentValidator
} from '@/components/pages/nature-lab/Phase1BlogPost/AddCommentForm/hooks'
import { NotLoggedIn } from '@/components/pages/nature-lab/Phase1BlogPost/NotLoggedIn'
import { useUser } from '@/lib/useUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  documentId: string
  slug: string
}

export function AddCommentForm({ documentId, slug }: Props) {
  const { isLoggedIn } = useUser()
  const [isPending, startTransition] = useTransition()

  const { control, handleSubmit, reset } = useForm<AddCommentProps>({
    resolver: zodResolver(addCommentValidator),
    defaultValues: {
      name: '',
      email: '',
      text: ''
    }
  })

  const onSubmit: SubmitHandler<AddCommentProps> = (data) => {
    startTransition(async () => {
      const response = await createComment({ documentId, data, slug })
      const toast = (await import('sonner')).toast

      if (!response.success) {
        toast.error(response.message)
        return
      }

      reset()
      toast.success('Comment added successfully')
      return
    })
  }

  if (isLoggedIn) {
    return <NotLoggedIn />
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <span>Is logged in: {isLoggedIn}</span>
        <FormInput control={control} name="name" label="Name" placeholder="Name" />
        <FormInput control={control} name="email" label="Email" placeholder="Email" />
        <FormInput control={control} name="text" label="Text" placeholder="Text" />
        <Button type="submit" size="sm" isLoading={isPending} className="w-full">
          Submit
        </Button>
      </form>
    </>
  )
}
