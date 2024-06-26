'use client'

import { Button } from '@/components/Button'
import { FormInput } from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'
import { createComment } from '@/components/pages/nature-lab/Phase1BlogPost/AddCommentForm/actions'
import {
  AddCommentProps,
  addCommentValidator
} from '@/components/pages/nature-lab/Phase1BlogPost/AddCommentForm/hooks'
import { NotLoggedIn } from '@/components/pages/nature-lab/Phase1BlogPost/NotLoggedIn'
import { useUser } from '@/lib/useUser'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  documentId: string
  slug: string
  className?: string
}

export function AddCommentForm({ documentId, slug, className }: Props) {
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
    return <NotLoggedIn className="mt-10" />
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-y-4', className)}>
        <h3 className="text-nature-lab-heading-sm lg:text-nature-lab-heading-md font-nature-lab-heading uppercase text-brand-dark-grey mb-4">
          Legg inn en kommentar
        </h3>
        <FormInput
          control={control}
          name="name"
          label="Name"
          placeholder="Name"
          variant="natureLab"
        />
        <FormInput
          control={control}
          name="email"
          label="Email"
          placeholder="Email"
          variant="natureLab"
        />
        <FormTextarea
          control={control}
          name="text"
          label="Text"
          placeholder="Text"
          variant="natureLab"
          className="h-40"
        />
        <Button type="submit" size="sm" isLoading={isPending} className="w-full">
          Submit
        </Button>
      </form>
    </>
  )
}
