import { getDictionary } from '@/app/dictionaries'
import { CreateAddressPage } from '@/components/pages/CreateAddressPage'
import { LangValues } from '@/data/constants'
import { Metadata } from 'next'

interface Props {
  params: {
    lang: LangValues
  }
}

export default async function Page({ params: { lang } }: Props) {
  const { create_address_page: dictionary } = await getDictionary({ lang })

  return <CreateAddressPage dictionary={dictionary} />
}

export function generateMetadata({ params: { lang } }: { params: { lang: LangValues } }): Metadata {
  const title = getTitle(lang)

  return {
    title
  }
}

function getTitle(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Opprett adresse'
    case 'en':
      return 'Create address'
    default:
      return 'Create address'
  }
}
