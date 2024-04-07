import * as Dialog from '@radix-ui/react-dialog';

export const overlayClasses =
  'transform-opacity fixed inset-0 z-20 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in';

export function Overlay() {
  return <Dialog.Overlay className={overlayClasses} />;
}
