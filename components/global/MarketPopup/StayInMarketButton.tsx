'use client';

import { Button } from '@/components/Button';
import { ControlledAlertDrawerCancel } from '@/components/ControlledAlertDrawer';
import { handleHasChosenMarket } from '@/components/global/MarketPopup/actions';

interface Props {
  children: React.ReactNode;
}

export function StayInMarketButton({ children }: Props) {
  return (
    <ControlledAlertDrawerCancel>
      <Button
        variant="secondary"
        onClick={async () => {
          await handleHasChosenMarket();
        }}
      >
        {children}
      </Button>
    </ControlledAlertDrawerCancel>
  );
}
