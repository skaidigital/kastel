'use client';

import { Dictionary } from '@/app/dictionaries';
import { Badge } from '@/components/Badge';
import { CustomLink } from '@/components/CustomLink';
import { Card, CardButton, CardContent } from '@/components/account/Card';
import { Text } from '@/components/base/Text';
import { ROUTES } from '@/data/constants';
import { Address } from '@/lib/shopify/types';

interface Props {
  address: Address;
  isPrimary?: boolean;
  dictionary: Dictionary['address_page'];
}

export function AddressCard({ address, isPrimary, dictionary }: Props) {
  const addressIdWithoutGid = removeGid(address.id);
  const editAddressHref = ROUTES.EDIT_ADDRESS.replace(':id', addressIdWithoutGid);

  return (
    <Card>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-md font-bold">{address.formatted[0]}</h2>
          {isPrimary && <Badge size="sm">{dictionary.primary}</Badge>}
        </div>
        <div className="flex flex-col gap-y-2">
          {address.formatted.map((line) => (
            <Text key={line} size="sm">
              {line}
            </Text>
          ))}
        </div>
      </CardContent>
      <CustomLink href={editAddressHref}>
        <CardButton>{dictionary.update_address}</CardButton>
      </CustomLink>
    </Card>
  );
}

export function removeGid(id: string) {
  return id.replace('gid://shopify/CustomerAddress/', '');
}
