'use client';

import { Dictionary } from '@/app/dictionaries';
import { Backdrop } from '@/components/Backdrop';
import { Button } from '@/components/Button';
import { Heading } from '@/components/base/Heading';
import { deleteAddress } from '@/components/pages/AddressesPage/DeleteAddressModal/actions';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useTransition } from 'react';

interface Props {
  addressId: string;
  dictionary: Dictionary['address_page'];
  isPrimary?: boolean;
}

export function DeleteAddressModal({ addressId, isPrimary, dictionary }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="secondary" fullWidth disabled={isPrimary}>
          {dictionary.delete_address}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay asChild>
          <Backdrop type="blur" />
        </AlertDialog.Overlay>
        <AlertDialog.Content asChild>
          <div className="fixed left-1/2 top-1/2 z-50 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col space-y-5 rounded-project border border-brand-border bg-white p-10">
            <Heading as="h3" size="xs">
              {dictionary.are_you_sure}
            </Heading>
            <div className="flex justify-end space-x-2">
              <AlertDialog.Cancel asChild>
                <Button variant="secondary">{dictionary.cancel}</Button>
              </AlertDialog.Cancel>
              <form
                action={async () => {
                  startTransition(() => {
                    deleteAddress(addressId);
                  });
                }}
              >
                <Button type="submit" isLoading={isPending}>
                  {dictionary.delete}
                </Button>
              </form>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
