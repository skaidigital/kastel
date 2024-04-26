import { getDictionary } from '@/app/dictionaries';
import { CreateAddressPage } from '@/components/pages/CreateAddressPage';
import { LangValues } from '@/data/constants';
import { Metadata } from 'next';

export default async function Page() {
  const { create_address_page: dictionary } = await getDictionary();

  return <CreateAddressPage dictionary={dictionary} />;
}

export function generateMetadata({ params: { lang } }: { params: { lang: LangValues } }): Metadata {
  const title = getTitle(lang);

  return {
    title
  };
}

function getTitle(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Opprett adresse';
    case 'en':
      return 'Create address';
    default:
      return 'Create address';
  }
}
