import { Button } from '@/components/Button';
import { deleteAddress } from '@/components/pages/AddressesPage/DeleteAddressModal/actions';

interface Props {
  addressId: string;
}

export function DeleteAddressButton({ addressId }: Props) {
  return (
    <form
      action={async () => {
        'use server';
        await deleteAddress(addressId);
      }}
    >
      <Button type="submit">Slett</Button>
    </form>
  );
}
