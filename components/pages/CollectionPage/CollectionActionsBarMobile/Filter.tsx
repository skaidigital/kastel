import { Sheet, SheetContent, SheetTrigger } from '@/components/Sheet';
import { Text } from '@/components/base/Text';

export function Filter() {
  return (
    <Sheet>
      <Text size="sm" asChild className="font-medium">
        <SheetTrigger className="flex flex-1 items-center justify-center bg-white py-4">
          Filter
        </SheetTrigger>
      </Text>
      <SheetContent>Stuff in here</SheetContent>
    </Sheet>
  );
}
