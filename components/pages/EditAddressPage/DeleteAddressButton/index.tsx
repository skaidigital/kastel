'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/AlertDialog';
import { deleteAddress } from '@/components/pages/EditAddressPage/DeleteAddressButton/actions';
import { ROUTES } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface Props {
  addressId: string;
  className?: string;
}

export function DeleteAddressButton({ addressId, className }: Props) {
  const [isPending, startTransition] = useTransition();
  const { market, lang } = useBaseParams();
  const router = useRouter();

  const onSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation(); // Stop the event from bubbling up

    startTransition(async () => {
      const response = await deleteAddress(addressId);

      if (!response.success) {
        toast.error('Something went wrong', {
          description: response.userErrors && response.userErrors[0]?.message
        });
        return;
      }
      if (response.success) {
        toast('Success!', {
          description: 'This address has been deleted.'
        });
        router.push(`/${market}/${lang}/${ROUTES.ADDRESSES}`);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover-text-red-900 flex w-full items-center justify-center gap-x-2 rounded-[2px] py-4 text-red-700 hover:bg-red-200">
        <TrashIcon className="size-4" />
        <span className="text-sm">Delete this address</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader className="mb-8">
          <AlertDialogTitle>Delete address</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this address?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={onSubmit} className="flex justify-end gap-x-2">
          <AlertDialogCancel className="leading-[14px] font-bold px-6 py-4 text-[14px]">
            No, cancel
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-red-700 px-6 py-4 text-[14px] font-bold leading-[14px] text-white"
          >
            <button type="submit">{isPending ? '' : 'Yes, delete this address'}</button>
          </AlertDialogAction>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
