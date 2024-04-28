'use client';

import { Dictionary } from '@/app/dictionaries';
import { CustomLink } from '@/components/CustomLink';
import { AccountPageHeader } from '@/components/account/AccountPageHeader';
import { EmptyState } from '@/components/account/EmptyState';
import { Text } from '@/components/base/Text';
import { AddressCard } from '@/components/pages/AddressesPage/AddressCard';
import { LangValues, ROUTES } from '@/data/constants';
import { Address } from '@/lib/shopify/types';
import { MapPinIcon } from '@heroicons/react/20/solid';
import { PlusIcon } from '@radix-ui/react-icons';

interface Props {
  addresses: Address[];
  defaultAddress: Address;
  dictionary: Dictionary['address_page'];
  lang: LangValues;
}

export function AddressesPage({ addresses, defaultAddress, dictionary, lang }: Props) {
  const hasAnAddress = addresses.length > 0 || defaultAddress;

  return (
    <div className="grid lg:col-span-6">
      <div className="flex items-center justify-between">
        <AccountPageHeader lang={lang} pageTitle={dictionary.addresses} />
        <CustomLink href={ROUTES.CREATE_ADDRESS} className="flex shrink-0 items-center space-x-1">
          <PlusIcon className="size-4" />
          <Text>{dictionary.add_address}</Text>
        </CustomLink>
      </div>
      {hasAnAddress && (
        <div className="grid gap-4 lg:grid-cols-2">
          <AddressCard address={defaultAddress} dictionary={dictionary} isPrimary />
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} dictionary={dictionary} />
          ))}
        </div>
      )}
      {!hasAnAddress && (
        <EmptyState
          icon={<MapPinIcon className="size-4" />}
          heading={dictionary.no_addresses}
          text={dictionary.add_address}
          href={ROUTES.CREATE_ADDRESS}
        />
      )}
    </div>
  );
}
