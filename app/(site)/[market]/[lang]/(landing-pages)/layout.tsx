import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export async function generateStaticParams() {
  return [
    { market: 'no', lang: 'no' },
    { market: 'no', lang: 'en' }
  ]
}

export default function Layout({ children }: Props) {
  return <div className="noTouch">{children}</div>
}
