'use client';

import { Button } from '@/components/Button';
import { logOut } from '@/lib/shopify/customer/actions';
import { useTransition } from 'react';

export const LogOutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogOut = async () => {
    await logOut();
  };

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await handleLogOut();
        });
      }}
      isLoading={isPending}
    >
      Logg ut
    </Button>
  );
};
