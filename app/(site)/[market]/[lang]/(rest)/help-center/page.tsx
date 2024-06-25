import { HelpCenterPage } from '@/components/pages/HelpCenterPage'
import { LangValues } from '@/data/constants'

export const dynamic = 'force-static'

interface Props {
  params: { lang: LangValues }
}

export default function Page({ params: { lang } }: Props) {
  return <HelpCenterPage lang={lang} />
}
