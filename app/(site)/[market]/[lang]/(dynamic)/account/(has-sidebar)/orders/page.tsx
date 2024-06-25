import { OrdersPage } from '@/components/pages/OrdersPage'
import { LangValues } from '@/data/constants'

export default function Page({
  params: { lang },
  searchParams
}: {
  params: {
    lang: LangValues
  }
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const currentPage = Number(searchParams?.page) || 1

  return <OrdersPage lang={lang} currentPage={currentPage} />
}
