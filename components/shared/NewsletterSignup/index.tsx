'use client';

import { Dictionary } from '@/app/dictionaries';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { Form } from '@/components/form/Form';
import { SubmitButton } from '@/components/form/SubmitButton';
import { TextField } from '@/components/form/TextField';
import { subscribeToNewsletter } from '@/components/shared/NewsletterSignup/actions';
import { NewsletterFormSchema } from '@/components/shared/NewsletterSignup/hooks';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

interface Props {
  klaviyoId: string;
  className?: string;
  dictionary: Dictionary['footer']['sign_up'];
}

export const NewsletterSignup = ({ klaviyoId, className, dictionary }: Props) => {
  const defaultValues: NewsletterFormSchema = { email: '' };
  const subscribeToNewsletterWithKlaviyoId = subscribeToNewsletter.bind(defaultValues, klaviyoId);

  const [formState, formAction] = useFormState(subscribeToNewsletterWithKlaviyoId, null);

  useEffect(() => {
    if (formState?.success === true) {
      toast.success(dictionary.success_message, {
        description: dictionary.success_description
      });
    }
    if (formState?.success === false) {
      toast.error(dictionary.error_message, {
        description: dictionary.error_description
      });
    }
  }, [formState?.success]);

  return (
    <div className={cn('', className)}>
      <Heading as="h2" size="sm">
        {dictionary.title}
      </Heading>
      <Text as="p" className="pt-6">
        {dictionary.description}
      </Text>
      <Form action={formAction} validationErrors={formState?.errors} className="mt-5">
        <TextField name="email" label={dictionary.email} autoComplete="email" isRequired />
        <SubmitButton>{dictionary.button_text}</SubmitButton>
      </Form>
    </div>
  );
};
