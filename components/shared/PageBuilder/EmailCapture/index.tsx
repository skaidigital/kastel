'use client'

import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { Media } from '@/components/Media'
import { Container } from '@/components/base/Container'
import { Section } from '@/components/base/Section'
import { FormCheckbox } from '@/components/form/FormCheckbox'
import { submitEmailCaptureForm } from '@/components/shared/PageBuilder/EmailCapture/actions'
import {
  EmailCaptureForm,
  emailCaptureFormValidator
} from '@/components/shared/PageBuilder/EmailCapture/hooks'
import { EmailCaptureProps } from '@/components/shared/PageBuilder/hooks'
import { LangValues } from '@/data/constants'
import { useBaseParams } from '@/lib/hooks/useBaseParams'
import { portableTextSerializer } from '@/lib/sanity/portableTextSerializer'
import { zodResolver } from '@hookform/resolvers/zod'
import { PortableText } from 'next-sanity'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface PropsWithExtra extends EmailCaptureProps {
  index: number
  pageId: string
  pageType: string
}

interface Props {
  data: PropsWithExtra
}

export const EmailCapture = ({ data }: Props) => {
  const { title, description, badge, buttonText, media, klaviyoListId } = data
  const [isPending, startTransition] = useTransition()
  const { lang } = useBaseParams()

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm<EmailCaptureForm>({
    resolver: zodResolver(emailCaptureFormValidator),
    defaultValues: {
      name: '',
      email: ''
    }
  })

  const onSubmit: SubmitHandler<EmailCaptureForm> = (data) => {
    startTransition(async () => {
      const response = await submitEmailCaptureForm(data, klaviyoListId)

      if (!response.success) {
        toast.error(response.message)
        return
      }

      reset()
      const successTitle = getSuccessTitle(lang)
      const successDescription = getSuccessDescription(lang)
      toast.success(successTitle, {
        description: successDescription
      })
    })
  }

  return (
    <Section
      label="emaiCapture"
      srHeading="Email capture"
      noTopPadding={true}
      noBottomPadding={true}
      hasBottomBorder={false}
      className="flex flex-col lg:flex-row"
    >
      <Container className="flex-1 py-24">
        <div className="flex flex-col gap-y-10 lg:mx-auto lg:max-w-md">
          <Logo className="w-20" />
          <div>
            {badge && <Badge className="mb-1">{badge}</Badge>}
            {title && <h1 className="mb-4 text-heading-md font-bold uppercase">{title}</h1>}
            {description && (
              <PortableText value={description} components={portableTextSerializer} />
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
            <div className="flex flex-col">
              <input
                {...register('name')}
                type="text"
                placeholder="Name"
                autoComplete="name"
                className="border border-brand-sand bg-brand-sand p-3 text-sm font-medium text-brand-mid-grey placeholder:text-sm placeholder:font-medium placeholder:text-brand-mid-grey hover:border hover:border-brand-light-grey"
              />
              {errors.name && (
                <span className="mt-2 text-xs text-red-500" id="email-error">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                {...register('email')}
                type="email"
                placeholder="Email"
                autoComplete="email"
                className="border border-brand-sand bg-brand-sand p-3 text-sm font-medium text-brand-mid-grey placeholder:text-sm placeholder:font-medium placeholder:text-brand-mid-grey hover:border hover:border-brand-light-grey"
              />
              {errors.email && (
                <span className="mt-2 text-xs text-red-500" id="email-error">
                  {errors.email.message}
                </span>
              )}
            </div>
            <FormCheckbox
              control={control}
              name="consented"
              label="I agree to the terms and conditions"
              className="py-3"
            />
            {buttonText && (
              <Button type="submit" size="sm" isLoading={isPending}>
                {buttonText}
              </Button>
            )}
          </form>
        </div>
      </Container>
      <div className="flex-1">
        {media && (
          <div className="!lg:aspect-none aspect-h-1 aspect-w-1 relative h-full w-full">
            <Media media={media} loading="eager" />
          </div>
        )}
      </div>
    </Section>
  )
}

function getSuccessTitle(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Welcome to the club!'
    case 'no':
      return 'Velkommen til klubben!'
    default:
      return 'Welcome to the club!'
  }
}

function getSuccessDescription(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Check your inbox for a confirmation email'
    case 'no':
      return 'Sjekk innboksen din for en bekreftelses-e-post'
    default:
      return 'Check your inbox for a confirmation email'
  }
}
