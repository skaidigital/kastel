'use client';

import { Dictionary } from '@/app/dictionaries';
import { Button } from '@/components/Button';
import { AccountPageHeader } from '@/components/account/AccountPageHeader';
import { FormCombobox } from '@/components/form/FormCombobox';
import { FormInput } from '@/components/form/FormInput';
import { FormSwitch } from '@/components/form/FormSwitch';
import { createAddress } from '@/components/pages/CreateAddressPage/actions';
import {
  CreateAddressFormInput,
  createAddressFormInputValidator
} from '@/components/pages/CreateAddressPage/hooks';
import { ROUTES } from '@/data/constants';
import countries from '@/data/countries';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
  dictionary: Dictionary['create_address_page'];
}

export function CreateAddressPage({ dictionary }: Props) {
  const [isPending, startTransition] = useTransition();
  const { market, lang } = useBaseParams();
  const router = useRouter();

  const { handleSubmit, control, reset, getValues } = useForm<CreateAddressFormInput>({
    resolver: zodResolver(createAddressFormInputValidator),
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address1: '',
      address2: '',
      zip: '',
      city: '',
      territoryCode: 'NO',
      defaultAddress: false
    }
  });

  const onSubmit: SubmitHandler<CreateAddressFormInput> = async (data) => {
    startTransition(async () => {
      const response = await createAddress(data);

      if (!response.success) {
        reset();
        toast.error('Something went wrong', {
          description: response.userErrors && response.userErrors[0]?.message
        });
      }
      if (response.success) {
        reset();
        toast('Success!', {
          description: 'Your new address has been created.'
        });
        router.push(`/${market}/${lang}/${ROUTES.ADDRESSES}`);
      }
    });
  };

  return (
    <div className="grid lg:col-span-3">
      <AccountPageHeader lang={lang} pageTitle={dictionary.create_address} />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <FormInput
          label={dictionary.first_name}
          name="firstName"
          autoComplete="given-name"
          control={control}
        />
        <FormInput
          label={dictionary.last_name}
          name="lastName"
          autoComplete="family-name"
          control={control}
        />
        <FormInput
          label={dictionary.phone_number}
          name="phoneNumber"
          autoComplete="tel"
          control={control}
        />
        <FormInput label={dictionary.address1} name="address1" control={control} />
        <FormInput label={dictionary.address2} name="address2" control={control} />
        <FormInput label={dictionary.zip} name="zip" control={control} />
        <FormInput label={dictionary.city} name="city" control={control} />
        <FormCombobox
          items={countries}
          label={dictionary.country}
          name="territoryCode"
          control={control}
        />
        <FormSwitch control={control} label={dictionary.default_address} name="defaultAddress" />

        <Button size="sm" type="submit" isLoading={isPending}>
          {dictionary.create_address}
        </Button>
      </form>
    </div>
  );
}
