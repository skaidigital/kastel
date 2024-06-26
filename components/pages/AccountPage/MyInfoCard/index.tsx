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
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';
import { CustomerMetadata } from '@/lib/shopify/metafields/getCustomerData';
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
  const isDesktop = useIsDesktop();
  const { lang } = useBaseParams();

  const customerDataValueJSON = customerData.metafield?.value;
  const parsedData = customerDataValueJSON && JSON.parse(customerDataValueJSON);

  const {
    getValues,
    handleSubmit,
    control,
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
      const response = await sendMyInfoForm(data, customerData.id);

      if (!response.success) {
        setIsOpen(false);
        toast.error('Something went wrong', {
          description: 'Please try again later'
        });
      }
      if (response.success) {
        setIsOpen(false);
        toast('We have updated your info!');
      }
    });
  };

  const myInfoString = getMyInfoString(lang);
  const footLengthString = getFootLengthString(lang);
  const styleString = getStyleString(lang);
  const colorString = getColorString(lang);
  const editString = getEditString(lang);

  const firstNameString = getFirstNameString(lang);
  const lastNameString = getLastNameString(lang);
  const footLengthTitleString = getFootLengthTitleString(lang);
  const footLengthDescriptionString = getFootLengthDescriptionString(lang);
  const styleTitleString = getStyleTitleString(lang);
  const styleDescriptionString = getStyleDescriptionString(lang);
  const colorPreferenceTitleString = getColorPreferenceTitleString(lang);
  const colorPreferenceDescriptionString = getColorPreferenceDescriptionString(lang);
  const submitString = getSubmitString(lang);

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
                label={firstNameString}
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="lastName"
                label={lastNameString}
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="footLength"
                label={footLengthTitleString}
                description={footLengthDescriptionString}
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="style"
                label={styleTitleString}
                description={styleDescriptionString}
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="color"
                label={colorPreferenceTitleString}
                description={colorPreferenceDescriptionString}
              />
              <Button type="submit" size="sm" isLoading={isPending} className="w-full">
                {submitString}
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
                label={firstNameString}
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="lastName"
                label={lastNameString}
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="footLength"
                label={footLengthTitleString}
                description={footLengthDescriptionString}
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="style"
                label={styleTitleString}
                description={styleDescriptionString}
              />
              <FormInput
                control={control}
                disabled={isSubmitting}
                name="color"
                label={colorPreferenceTitleString}
                description={colorPreferenceDescriptionString}
              />
              <Button type="submit" size="sm" isLoading={isPending} className="w-full">
                {submitString}
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

function getFirstNameString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'First name';
    case 'no':
      return 'Fornavn';
    default:
      return 'First name';
  }
}

function getLastNameString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Last name';
    case 'no':
      return 'Etternavn';
    default:
      return 'Last name';
  }
}

function getFootLengthTitleString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Foot length';
    case 'no':
      return 'Fotlengde';
    default:
      return 'Foot length';
  }
}

function getFootLengthDescriptionString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Draw your longest foot on a piece of paper and measure from the middle of the heel to the tip of the longest toe.';
    case 'no':
      return 'Tegn din lengste fot på et papir og mål fra midten av hælen til tuppen av den lengste tåen.';
    default:
      return 'Draw your longest foot on a piece of paper and measure from the middle of the heel to the tip of the longest toe.';
  }
}

function getStyleTitleString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Style';
    case 'no':
      return 'Stil';
    default:
      return 'Style';
  }
}

function getStyleDescriptionString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'We’d love to get to know you better. How would you describe your style? Casual, elegant, minimal?';
    case 'no':
      return 'Vi ønsker å bli bedre kjent med deg. Hvordan vil du beskrive din stil? Uformell, elegant, minimalistisk?';
    default:
      return 'We’d love to get to know you better. How would you describe your style? Casual, elegant, minimal?';
  }
}

function getColorPreferenceTitleString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Color preference';
    case 'no':
      return 'Fargepreferanse';
    default:
      return 'Color preference';
  }
}

function getColorPreferenceDescriptionString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Understanding your preferences helps us create products you’ll love. What’s your go-to color when buying shoes?';
    case 'no':
      return 'Å forstå dine preferanser hjelper oss å lage produkter du vil elske. Hva er din foretrukne farge når du kjøper sko?';
    default:
      return 'Understanding your preferences helps us create products you’ll love. What’s your go-to color when buying shoes?';
  }
}

function getSubmitString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Submit';
    case 'no':
      return 'Lagre';
    default:
      return 'Submit';
  }
}
