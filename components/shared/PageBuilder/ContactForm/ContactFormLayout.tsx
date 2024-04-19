'use client';

import { Dictionary } from '@/app/dictionaries';
import { Button } from '@/components/Button';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { FormContainer } from '@/components/form/FormContainer';
import { FormInput } from '@/components/form/FormInput';
import { TwoColumnRow } from '@/components/form/TwoColumnRow';
import { sendContactForm } from '@/components/shared/PageBuilder/ContactForm/actions';
import {
  ContactFormFormProps,
  contactFormValidator
} from '@/components/shared/PageBuilder/ContactForm/hooks';
import { ContactFormProps } from '@/components/shared/PageBuilder/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
  data: ContactFormProps;
  dictionary: Dictionary['page_builder']['contact_form'];
  // market?: MarketValues;
}

export function ContactFormLayout({ data, dictionary }: Props) {
  const { padding, hasTopPadding, hasBottomPadding, hasBottomBorder } = data;

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = useForm<ContactFormFormProps>({
    resolver: zodResolver(contactFormValidator),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit: SubmitHandler<ContactFormFormProps> = async (data) => {
    await sendContactForm(data);

    reset();
    toast('We have received your inquiry!', {
      description: 'We will respond as soon as possible.'
    });
  };

  return (
    <Section
      size={padding}
      noTopPadding={!hasTopPadding}
      noBottomPadding={!hasBottomPadding}
      label="page-title"
      srHeading="Page title"
      className={hasBottomBorder ? 'border-brand-border border-b' : ''}
    >
      <Container size="sm" className="flex flex-col items-center justify-center space-y-10">
        <Heading as="h2" size="md" className="text-center">
          {dictionary.contact_us}
        </Heading>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <TwoColumnRow>
            <FormInput
              control={control}
              disabled={isSubmitting}
              name="name"
              label={dictionary.name || ''}
              autoComplete="name"
            />
            <FormInput
              control={control}
              disabled={isSubmitting}
              name="email"
              label={dictionary?.email || ''}
              type="email"
              autoComplete="email"
            />
          </TwoColumnRow>
          <FormInput
            control={control}
            disabled={isSubmitting}
            name="message"
            label={dictionary?.message || ''}
          />
          <Button type="submit" isLoading={isSubmitting}>
            {dictionary?.send || ''}
          </Button>
        </FormContainer>
      </Container>
    </Section>
  );
}
