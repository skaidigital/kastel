'use client';

import { Dictionary } from '@/app/dictionaries';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Text } from '@/components/base/Text';
import { subscribeToNewsletter } from '@/components/shared/NewsletterSignup/actions';
import {
  NewsletterFormSchema,
  newsletterFormSchema
} from '@/components/shared/NewsletterSignup/hooks';
import { LangValues } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
  className?: string;
  dictionary: Dictionary['footer']['sign_up'];
  labelText: string;
  descriptionText: string;
}

export const NewsletterSignup = ({ className, labelText, descriptionText }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { lang } = useBaseParams();

  const { handleSubmit, register, reset } = useForm<NewsletterFormSchema>({
    resolver: zodResolver(newsletterFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: ''
    }
  });

  const toastSuccessTitle = getSuccessToastTitle(lang);
  const toastSuccessDescription = getSuccessToastDescription(lang);
  const toastErrorTitle = getErrorToastTitle(lang);
  const toastErrorDescription = getErrorToastDescription(lang);

  async function onSubmit(data: NewsletterFormSchema) {
    startTransition(async () => {
      const response = await subscribeToNewsletter({ email: data.email });

      if (response.success) {
        toast.success(toastSuccessTitle, {
          description: toastSuccessDescription
        });
        reset();
        return;
      }
      toast.error(toastErrorTitle, {
        description: toastErrorDescription
      });
      reset();
      return;
    });
  }

  const emailString = getYourEmailString(lang);
  const subscribeString = getSubscribeString(lang);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-y-4', className)}>
      <div className="flex flex-col gap-y-3">
        {labelText && <Text size="sm">{labelText}</Text>}
        <div className="relative h-12 w-60 rounded-[4px] bg-brand-primary-light ">
          <input
            {...register('email')}
            placeholder={emailString}
            className="placeholder:tex-sm absolute left-0 top-0 h-full w-full bg-transparent px-4 text-sm font-medium text-brand-dark-grey placeholder:text-brand-dark-grey"
          />
          <button
            aria-label={subscribeString}
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark-grey"
          >
            {isPending ? <LoadingSpinner /> : <ArrowRightIcon className="size-5 " />}
          </button>
        </div>
      </div>
      {descriptionText && (
        <Text size="sm" className="max-w-lg text-balance text-white">
          {descriptionText}
        </Text>
      )}
    </form>
  );
};

function getSubscribeString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Abonner';
    case 'en':
      return 'Subscribe';
    default:
      return 'Subscribe';
  }
}

function getYourEmailString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Din e-post';
    case 'en':
      return 'Your email';
    default:
      return 'Your email';
  }
}

function getSuccessToastTitle(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Du har blitt registrert på vår nyhetsbrev!';
    case 'en':
      return 'You have successfully signed up for our newsletter!';
    default:
      return 'You have successfully signed up for our newsletter!';
  }
}

function getSuccessToastDescription(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Vennligst sjekk innboksen din for en bekreftelses-e-post.';
    case 'en':
      return 'Please check your inbox for a confirmation email.';
    default:
      return 'Please check your inbox for a confirmation email.';
  }
}

function getErrorToastTitle(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Det oppstod en feil';
    case 'en':
      return 'There was an error signing up for our newsletter. Please try again later.';
    default:
      return 'There was an error signing up for our newsletter. Please try again later.';
  }
}

function getErrorToastDescription(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Vennligst prøv igjen senere.';
    case 'en':
      return 'Please try again later.';
    default:
      return 'Please try again later.';
  }
}
