import { HelpCenterPage } from '@/components/pages/HelpCenterPage';
import { LangValues } from '@/data/constants';

interface Props {
  params: { lang: LangValues };
}

export default function Page({ params: { lang } }: Props) {
  return <HelpCenterPage lang={lang} />;
}
