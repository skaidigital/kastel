'use client';

import { UserError } from '@/app/[market]/[lang]/(site)/shopify/types';
import { Dictionary } from '@/app/dictionaries';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/form/Checkbox';
import { FormContainer } from '@/components/form/FormContainer';
import { FormError } from '@/components/form/FormError';
import { FormInput } from '@/components/form/FormInput';
import { RadixCombobox } from '@/components/form/RadixCombobox';
import { DeleteAddressModal } from '@/components/pages/AddressesPage/DeleteAddressModal';
import { updateAddress } from '@/components/pages/AddressesPage/UpdateAddressForm/actions';
import {
  UpdateAddressFormProps,
  updateAddressFormValidator
} from '@/components/pages/AddressesPage/UpdateAddressForm/hooks';
import { Address } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

// TODO add back button
interface Props {
  addressId: string;
  address: Address;
  dictionary: Dictionary['address_page'];
  defaultAddress?: boolean;
  onClose: () => void;
  className?: string;
}

// TODO fix error handling
export function UpdateAddressForm({
  addressId,
  address,
  defaultAddress,
  className,
  onClose,
  dictionary
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [userErrors, setUserErrors] = useState<UserError[] | undefined>();

  const { handleSubmit, control, reset } = useForm<UpdateAddressFormProps>({
    resolver: zodResolver(updateAddressFormValidator),
    mode: 'onSubmit',
    defaultValues: {
      firstName: address.firstName,
      lastName: address.lastName,
      address1: address.address1,
      address2: address.address2,
      zip: address.zip,
      city: address.city,
      territoryCode: address.territoryCode,
      phoneNumber: address.phoneNumber,
      defaultAddress: defaultAddress
    }
  });

  const onSubmit: SubmitHandler<UpdateAddressFormProps> = async (data) => {
    startTransition(async () => {
      const result = await updateAddress({ formData: data, addressId });

      if (!result) {
        toast('Something went wrong');
        return;
      }

      if (result.userErrors && result.userErrors.length > 0) {
        setUserErrors(result.userErrors);
        return;
      }

      reset();
      onClose();
      toast('Address updated');
    });
  };

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      className={cn('lg:max-h-auto max-h-[90dvh] space-y-4 overflow-y-auto', className)}
    >
      <FormInput control={control} name="firstName" label={dictionary.form.first_name} />
      <FormInput control={control} name="lastName" label={dictionary.form.last_name} />
      <FormInput control={control} name="address1" label={dictionary.form.address1} />
      <FormInput control={control} name="address2" label={dictionary.form.address2} />
      <FormInput control={control} name="zip" label={dictionary.form.zip} />
      <FormInput control={control} name="city" label={dictionary.form.city} />
      <Controller
        control={control}
        name="territoryCode"
        render={({ field }) => (
          <RadixCombobox
            {...field}
            name="territoryCode"
            label={dictionary.form.country}
            defaultValue={address.territoryCode}
          />
        )}
      />
      <FormInput control={control} name="phoneNumber" label={dictionary.form.phone_number} />
      <Controller
        control={control}
        name="defaultAddress"
        render={({ field }) => (
          <Checkbox {...field} name="defaultAddress" value="true" defaultSelected={defaultAddress}>
            {dictionary.form.default_address}
          </Checkbox>
        )}
      />
      <div className="grid gap-y-3">
        <Button type="submit" isLoading={isPending}>
          {dictionary.form.save_address}
        </Button>
        {userErrors && (
          <div className="flex flex-col gap-y-2">
            {userErrors.map((error: UserError) => (
              <FormError key={error.message} error={error.message} />
            ))}
          </div>
        )}
        <DeleteAddressModal
          addressId={addressId}
          isPrimary={defaultAddress}
          dictionary={dictionary}
        />
      </div>
    </FormContainer>
  );
}
