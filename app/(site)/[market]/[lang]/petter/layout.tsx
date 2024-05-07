import { LangValues, MarketValues } from '@/data/constants';
import { ReactNode } from 'react';

interface Props {
  params: { market: MarketValues; lang: LangValues };
  children: ReactNode;
}

export default function Layout({ params: { market, lang }, children }: Props) {
  return <div className="noTouch">{children}</div>;
}
