/* eslint-disable no-unused-vars */
'use client';

import { Dictionary } from '@/app/dictionaries';
import { Badge } from '@/components/Badge';
import { Drawer } from '@/components/Drawer';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { UpdateAddressForm } from '@/components/pages/AddressesPage/UpdateAddressForm';
import { Address } from '@/lib/shopify/types';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Props {
  address: Address;
  isPrimary?: boolean;
  dictionary: Dictionary['address_page'];
}

export function AddressCard({ address, isPrimary, dictionary }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  function handleClose() {
    console.log('close');
    setIsDrawerOpen(false);
  }

  return (
    <Drawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <Drawer.Trigger>
        <div className="group transition-brand flex flex-col space-y-3 rounded-project border border-brand-border p-5 @container hover:border-brand-dark-grey">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full flex-col justify-between @[320px]:flex-row-reverse @[320px]:items-center">
              {isPrimary && (
                <div className="mb-4">
                  <Badge size="sm">{dictionary.primary}</Badge>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Heading as="h3" size="xs">
                  {address.formatted[0]}
                </Heading>
                <button className="transition-brand rounded-project text-brand-mid-grey group-hover:text-brand-dark-grey ">
                  <PencilIcon className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {address.formatted.map((line) => (
              <Text key={line} size="sm">
                {line}
              </Text>
            ))}
          </div>
        </div>
      </Drawer.Trigger>
      <Drawer.Content placement="right">
        <Drawer.Header>{dictionary.update_address}</Drawer.Header>
        <UpdateAddressForm
          addressId={address.id}
          address={address}
          defaultAddress={isPrimary}
          dictionary={dictionary}
          onClose={handleClose}
          className="p-5"
        />
      </Drawer.Content>
    </Drawer>
  );
}
