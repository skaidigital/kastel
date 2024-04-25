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
import { useDeviceType } from '@/lib/useDeviceType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {}

export function MyInfoCard({}: Props) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isDesktop } = useDeviceType();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = useForm<MyInfoFormProps>({
    resolver: zodResolver(myInfoFormValidator),
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      footLength: '',
      style: '',
      colorPreference: ''
    }
  });

  const onSubmit: SubmitHandler<MyInfoFormProps> = async (data) => {
    startTransition(async () => {
      const response = await sendMyInfoForm(data);

      if (!response.success) {
        setIsOpen(false);
        reset();
        toast.error('Something went wrong', {
          description: 'Please try again later'
        });
      }
      if (response.success) {
        setIsOpen(false);
        reset();
        toast('We have received your inquiry!', {
          description: 'We will respond as soon as possible.'
        });
      }
    });
  };

  return (
    <Card>
      <CardContent>
        <CardTitle>My info</CardTitle>
        <div className="flex flex-col gap-y-2">
          <Text size="sm">Luisa Arango</Text>
          <Text size="sm">Foot length: 26cm</Text>
        </div>
      </CardContent>
      {!isDesktop && (
        <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button>
              <CardButton>Test me</CardButton>
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader title="My info" />
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
                name="colorPreference"
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
              <CardButton>Test me</CardButton>
            </button>
          </ModalTrigger>
          <ModalContent size="sm" label="Someting" className="p-8">
            <ModalHeader title="My info" />
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
                name="colorPreference"
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
