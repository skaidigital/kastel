'use client';

import { Dictionary } from '@/app/dictionaries';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Text } from '@/components/base/Text';
import { subscribeToNewsletter } from '@/components/shared/NewsletterSignup/actions';
import {
  NewsletterFormSchema,
  newsletterFormSchema
} from '@/components/shared/NewsletterSignup/hooks';
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

  const { handleSubmit, register, reset } = useForm<NewsletterFormSchema>({
    resolver: zodResolver(newsletterFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: ''
    }
  });

  async function onSubmit(data: NewsletterFormSchema) {
    startTransition(async () => {
      const response = await subscribeToNewsletter({ email: data.email });

      if (response.success) {
        toast.success('You have successfully subscribed to our newsletter');
        reset();
        return;
      }
      toast.error('Something went wrong. Please try again later');
      reset();
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-y-4', className)}>
      <div className="flex flex-col gap-y-3">
        {labelText && <Text size="sm">{labelText}</Text>}
        <div className="relative h-12 w-60 rounded-[4px] bg-brand-primary-light ">
          <input
            {...register('email')}
            placeholder="Email"
            className="placeholder:tex-sm absolute left-0 top-0 h-full w-full bg-transparent px-4 text-sm font-medium text-brand-dark-grey placeholder:text-brand-dark-grey"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark-grey"
          >
            {isPending ? <LoadingSpinner /> : <ArrowRightIcon className="size-5 " />}
          </button>
        </div>
      </div>
      {descriptionText && (
        <Text size="sm" className="max-w-lg text-balance text-brand-light-grey">
          {descriptionText}
        </Text>
      )}
    </form>
  );
};
