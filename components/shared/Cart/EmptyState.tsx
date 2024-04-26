import { Button } from '@/components/Button';
import { DrawerClose, DrawerHeader } from '@/components/Drawer';
import { Heading } from '@/components/base/Heading';

interface Props {
  cartText: string;
  cartIsEmptyText: string;
  startShoppingText: string;
}

export function EmptyState({ cartText, cartIsEmptyText, startShoppingText }: Props) {
  return (
    <div className="flex grow flex-col">
      <DrawerHeader title={cartText} />
      <div className="flex h-full grow flex-col  items-center justify-center space-y-5 lg:space-y-10">
        <Heading as="h2" size="xs">
          {cartIsEmptyText}
        </Heading>
        <DrawerClose>
          <Button variant="outline" size="sm">
            {startShoppingText}
          </Button>
        </DrawerClose>
      </div>
    </div>
  );
}
