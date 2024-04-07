import { Sheet, SheetContent, SheetTrigger } from '@/components/Sheet';

export default function Page() {
  return (
    <div>
      <SheetTest />
    </div>
  );
}

function SheetTest() {
  return (
    <Sheet>
      <SheetTrigger>Test</SheetTrigger>
      <SheetContent title="Test">My content is here</SheetContent>
    </Sheet>
  );
}
