'use client'

import { CustomLink } from '@/components/CustomLink'
import { LangValues, ROUTES } from '@/data/constants'
import { useBaseParams } from '@/lib/hooks/useBaseParams'
import { logIn } from '@/lib/shopify/customer/actions'
import { useUser } from '@/lib/useUser'

export const AccountButton = () => {
  const { lang } = useBaseParams()
  const accountString = getAccountString(lang)
  const { isLoggedIn } = useUser()

  if (isLoggedIn) {
    return (
      <CustomLink href={ROUTES.ACCOUNT} aria-label="Go to account" className="text-sm">
        {accountString}
      </CustomLink>
    )
  }

  async function handleClick() {
    await logIn()
  }

  return (
    <button onClick={handleClick} className="text-sm" aria-label="Go to account">
      {accountString}
    </button>
  )
}

function getAccountString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Account'
    case 'no':
      return 'Konto'
    default:
      return 'Account'
  }
}
