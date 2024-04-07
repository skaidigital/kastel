import { Button } from '@/components/Button';
import { Drawer } from '@/components/Drawer';
import { Heading } from '@/components/base/Heading';

interface Props {
  cartText: string;
  cartIsEmptyText: string;
  startShoppingText: string;
}

export function EmptyState({ cartText, cartIsEmptyText, startShoppingText }: Props) {
  return (
    <div className="flex grow flex-col">
      <Drawer.Header>{cartText}</Drawer.Header>
      <div className="flex h-full grow flex-col  items-center justify-center space-y-5 lg:space-y-10">
        <Heading as="h2" size="sm">
          {cartIsEmptyText}
        </Heading>
        <Drawer.Close>
          <Button variant="secondary">{startShoppingText}</Button>
        </Drawer.Close>
      </div>
    </div>
  );
}
