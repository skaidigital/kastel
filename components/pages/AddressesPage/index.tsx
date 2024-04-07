'use client';

import { Dictionary } from '@/app/dictionaries';
import { BackButton } from '@/components/BackButton';
import { buttonProps } from '@/components/Button';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { AddressCard } from '@/components/pages/AddressesPage/AddressCard';
import { ROUTES } from '@/data/constants';
import { Address } from '@/lib/shopify/types';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Props {
  addresses: Address[];
  defaultAddress: Address;
  dictionary: Dictionary['address_page'];
}

export function AddressesPage({ addresses, defaultAddress, dictionary }: Props) {
  const hasAnAddress = addresses.length > 0 || defaultAddress;

  return (
    <Section
      label={dictionary.address_info}
      srHeading={dictionary.address_info}
      className="px-6 md:px-12 lg:px-20"
    >
      <BackButton href={ROUTES.ACCOUNT} className="mb-5">
        {dictionary.orders}
      </BackButton>
      <div className="mb-10 flex items-center space-x-3">
        <Heading size="md">{dictionary.addresses}</Heading>
        <Link href={ROUTES.CREATE_ADDRESS} className="flex items-center space-x-1">
          <PlusIcon className="w-4" />
          <Text>{dictionary.add_address}</Text>
        </Link>
      </div>
      {hasAnAddress && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          <AddressCard address={defaultAddress} dictionary={dictionary} isPrimary />
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} dictionary={dictionary} />
          ))}
        </div>
      )}
      {!hasAnAddress && (
        <div className="aspect-h-9 aspect-w-16 flex h-full w-full rounded-project border border-brand-border ">
          <div className="flex flex-col items-center justify-center gap-y-5">
            <Heading size="xs">{dictionary.no_addresses}</Heading>
            <Link href={ROUTES.CREATE_ADDRESS} className={buttonProps({ variant: 'primary' })}>
              {dictionary.add_address}
            </Link>
          </div>
        </div>
      )}
    </Section>
  );
}
