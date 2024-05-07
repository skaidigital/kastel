import StaticComp from './staticComp';

interface Props {
  params: { market: string; lang: string };
}

export default async function Petter({ params: { market, lang } }: Props) {
  return <StaticComp />;
}
