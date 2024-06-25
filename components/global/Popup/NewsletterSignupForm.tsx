'use client'

import { Button } from '@/components/Button'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { subscribeToNewsletter } from '@/components/shared/NewsletterSignup/actions'
import { LangValues } from '@/data/constants'
import { useBaseParams } from '@/lib/hooks/useBaseParams'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formValidator = z.object({
  email: z.string().email()
})

type FormProps = z.infer<typeof formValidator>

export function NewsletterSignupForm({
  buttonText,
  onClose
}: {
  buttonText: string
  onClose: () => void
}) {
  const [isPending, startTransition] = useTransition()
  const { lang } = useBaseParams()

  const { register, handleSubmit } = useForm<FormProps>({
    mode: 'onBlur',
    resolver: zodResolver(formValidator),
    defaultValues: {
      email: ''
    }
  })

  const toastSuccessTitle = getSuccessToastTitle(lang)
  const toastSuccessDescription = getSuccessToastDescription(lang)
  const toastErrorTitle = getErrorToastTitle(lang)
  const toastErrorDescription = getErrorToastDescription(lang)

  const onSubmit = async (data: FormProps) => {
    startTransition(async () => {
      const response = await subscribeToNewsletter({
        email: data.email
      })

      onClose()
      if (response.success) {
        toast.success(toastSuccessTitle, {
          description: toastSuccessDescription
        })
        return
      }
      toast.error(toastErrorTitle, {
        description: toastErrorDescription
      })
    })
  }

  const emailString = getYourEmailString(lang)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-y-2">
      <input
        {...register('email')}
        autoComplete="email"
        type="Email"
        className="w-full rounded-[2px] border border-brand-light-grey bg-brand-sand p-3 text-sm font-medium text-brand-mid-grey placeholder:text-sm placeholder:font-medium placeholder:text-brand-mid-grey"
        placeholder={emailString}
      />
      <Button type="submit" size="sm" className="relative">
        <span className={isPending ? 'hidden' : ''}> {buttonText}</span>
        {isPending && (
          <LoadingSpinner className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </Button>
    </form>
  )
}

function getYourEmailString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Din e-post'
    case 'en':
      return 'Your email'
    default:
      return 'Your email'
  }
}

function getSuccessToastTitle(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Du har blitt registrert på vår nyhetsbrev!'
    case 'en':
      return 'You have successfully signed up for our newsletter!'
    default:
      return 'You have successfully signed up for our newsletter!'
  }
}

function getSuccessToastDescription(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Vennligst sjekk innboksen din for en bekreftelses-e-post.'
    case 'en':
      return 'Please check your inbox for a confirmation email.'
    default:
      return 'Please check your inbox for a confirmation email.'
  }
}

function getErrorToastTitle(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Det oppstod en feil'
    case 'en':
      return 'There was an error signing up for our newsletter. Please try again later.'
    default:
      return 'There was an error signing up for our newsletter. Please try again later.'
  }
}

function getErrorToastDescription(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Vennligst prøv igjen senere.'
    case 'en':
      return 'Please try again later.'
    default:
      return 'Please try again later.'
  }
}
