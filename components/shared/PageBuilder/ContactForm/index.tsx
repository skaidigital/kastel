'use client';
import { ContactFormLayout } from '@/components/shared/PageBuilder/ContactForm/ContactFormLayout';
import { ContactFormProps } from '@/components/shared/PageBuilder/hooks';
import { useDictionary } from './hooks';

interface Props {
  data: ContactFormProps;
}

export const ContactForm = ({ data }: Props) => {
  const { dictionary, loading, error } = useDictionary(data.market);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading dictionary!</div>;
  if (!dictionary) return <div>Loading...</div>;

  const contactFormDictionary = dictionary?.page_builder?.contact_form;

  return <ContactFormLayout data={data} dictionary={contactFormDictionary} />;
};
