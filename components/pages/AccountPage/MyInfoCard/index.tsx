'use client';

import { Button } from '@/components/Button';
import { Modal, ModalContent, ModalHeader, ModalTrigger } from '@/components/Modal';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/Sheet';
import { Card, CardButton, CardContent, CardTitle } from '@/components/account/Card';
import { Text } from '@/components/base/Text';
import { FormInput } from '@/components/form/FormInput';
import { sendMyInfoForm } from '@/components/pages/AccountPage/MyInfoCard/actions';
import {
  MyInfoFormProps,
  myInfoFormValidator
} from '@/components/pages/AccountPage/MyInfoCard/hooks';
import { LangValues } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { CustomerMetadata } from '@/lib/shopify/metafields/getCustomerData';
import { useDeviceType } from '@/lib/useDeviceType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
  customerData: CustomerMetadata['data']['customer'];
}

export function MyInfoCard({ customerData }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isDesktop } = useDeviceType();
  const { lang } = useBaseParams();

  const customerDataValueJSON = customerData.metafield?.value;
  const parsedData = customerDataValueJSON && JSON.parse(customerDataValueJSON);

  const {
    getValues,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = useForm<MyInfoFormProps>({
    resolver: zodResolver(myInfoFormValidator),
    mode: 'onSubmit',
    defaultValues: {
      firstName: customerData.firstName ?? '',
      lastName: customerData.lastName ?? '',
      footLength: parsedData?.footLength ?? '',
      style: parsedData?.style ?? '',
      color: parsedData?.color ?? ''
    }
  });

  const onSubmit: SubmitHandler<MyInfoFormProps> = async (data) => {
    startTransition(async () => {
      console.log(data);

      const response = await sendMyInfoForm(data, customerData.id);

      if (!response.success) {
        setIsOpen(false);
        reset();
        toast.error('Something went wrong', {
          description: 'Please try again later'
        });
      }
      if (response.success) {
        setIsOpen(false);
        // reset();
        toast('We have received your inquiry!', {
          description: 'We will respond as soon as possible.'
        });
      }
    });
  };

  const myInfoString = getMyInfoString(lang);
  const footLengthString = getFootLengthString(lang);
  const styleString = getStyleString(lang);
  const colorString = getColorString(lang);
  const editString = getEditString(lang);

  const hasFirstNameOrLastName = getValues('firstName') !== '' || getValues('lastName') !== '';
  const hasFootLength = getValues('footLength') !== '';
  const hasStyle = getValues('style') !== '';
  const hasColor = getValues('color') !== '';

  return (
    <Card>
      <CardContent>
        <CardTitle>{myInfoString}</CardTitle>
        <div className="flex flex-col gap-y-2">
          {hasFirstNameOrLastName && (
            <Text size="sm">
              {getValues('firstName')} {getValues('lastName')}
            </Text>
          )}
          {hasFootLength && (
            <Text size="sm">
              {footLengthString}: {getValues('footLength')}
            </Text>
          )}
          {hasStyle && (
            <Text size="sm">
              {styleString}: {getValues('style')}
            </Text>
          )}
          {hasColor && (
            <Text size="sm">
              {colorString}: {getValues('color')}
            </Text>
          )}
        </div>
      </CardContent>
      {!isDesktop && (
        <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button>
              <CardButton>{editString}</CardButton>
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader title={myInfoString} />
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="firstName"
                label="First name"
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="lastName"
                label="Last name"
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="footLength"
                label="Foot length"
                description="Measure from the base of your foot to something something or another something"
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="style"
                label="Style"
                description="Measure from the base of your foot to something something or another something"
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="color"
                label="Color preference"
                description="Measure from the base of your foot to something something or another something"
              />
              <Button type="submit" size="sm" isLoading={isPending} className="w-full">
                Submit
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      )}
      {isDesktop && (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
          <ModalTrigger>
            <button>
              <CardButton>{editString}</CardButton>
            </button>
          </ModalTrigger>
          <ModalContent size="sm" label="Someting" className="p-8">
            <ModalHeader title={myInfoString} />
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="firstName"
                label="First name"
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="lastName"
                label="Last name"
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="footLength"
                label="Foot length"
                description="Measure from the base of your foot to something something or another something"
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="style"
                label="Style"
                description="Measure from the base of your foot to something something or another something"
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="color"
                label="Color preference"
                description="Measure from the base of your foot to something something or another something"
              />
              <Button type="submit" size="sm" isLoading={isPending} className="w-full">
                Submit
              </Button>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
}

function getMyInfoString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'My info';
    case 'no':
      return 'Min info';
    default:
      return 'My info';
  }
}

function getFootLengthString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Foot length';
    case 'no':
      return 'Fotlengde';
    default:
      return 'Foot length';
  }
}

function getStyleString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Style';
    case 'no':
      return 'Stil';
    default:
      return 'Style';
  }
}

function getColorString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Color preference';
    case 'no':
      return 'Fargepreferanse';
    default:
      return 'Color preference';
  }
}

function getEditString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Edit';
    case 'no':
      return 'Endre';
    default:
      return 'Edit';
  }
}
