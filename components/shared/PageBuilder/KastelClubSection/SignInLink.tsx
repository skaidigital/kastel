'use client'

import { CustomLink } from '@/components/CustomLink'
import { LangValues, ROUTES } from '@/data/constants'
import { useBaseParams } from '@/lib/hooks/useBaseParams'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export function SignInLink({ className }: Props) {
  const { lang } = useBaseParams()

  const doYouHaveAnAccountText = getDoYouHaveAnAccountText(lang)
  const signInText = getSignInText(lang)

  return (
    <div className={cn('flex gap-x-1', className)}>
      <span>{doYouHaveAnAccountText}</span>
      <CustomLink href={ROUTES.ACCOUNT} className="font-medium underline">
        {signInText}
      </CustomLink>
    </div>
  )
}

function getDoYouHaveAnAccountText(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Already have an account?'
    case 'no':
      return 'Har du allerede en konto?'
    default:
      return 'Already have an account?'
  }
}

function getSignInText(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Sign in'
    case 'no':
      return 'Logg inn'
    default:
      return 'Sign in'
  }
}
