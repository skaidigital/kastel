'use client';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { Modal, ModalContent } from '@/components/Modal';
import { Sheet, SheetContent } from '@/components/Sheet';
import { Text } from '@/components/base/Text';
import { NewsletterSignupForm } from '@/components/global/Popup/NewsletterSignupForm';
import { hasSeenPopup } from '@/components/global/Popup/actions';
import { PopupPayload } from '@/components/global/Popup/hooks';
import { SanityImage } from '@/components/sanity/SanityImage';
import { SanityLink } from '@/components/sanity/SanityLink';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';
import { LinkProps } from '@/lib/sanity/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

interface Props {
  data: PopupPayload;
}

// TODO translate the messages
// TODO vertically center the loading spinner
export function PopupLayout({ data }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { title, content, image, badge, type } = data;

  async function handlePopupClose() {
    await hasSeenPopup();
    setIsOpen(false);
  }
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isOpen) {
      hasSeenPopup();
    }
  }, [isOpen]);

  if (isDesktop) {
    return (
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent
          size="md"
          onClose={handlePopupClose}
          label="Popup"
          className="w-auto border-none bg-transparent"
        >
          <div className="max-h-auto grid max-h-dvh grid-cols-2">
            <div className="relative w-[400px]">
              <div className="aspect-h-4 aspect-w-3 relative">
                {image && (
                  <SanityImage
                    image={image}
                    fill
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="flex w-[400px] flex-col justify-between bg-white p-8">
              <div className="flex items-center justify-between">
                <Logo className="w-20" />
                <Dialog.Close asChild>
                  <Button onClick={handlePopupClose} variant="ghost" size="icon" className="p-1">
                    <XMarkIcon className="size-6" />
                  </Button>
                </Dialog.Close>
              </div>
              <MainContent badge={badge} title={title} content={content} />
              {type === 'newsletter' && data.buttonText && (
                <NewsletterSignupForm buttonText={data.buttonText} onClose={handlePopupClose} />
              )}
              {type === 'info' && data.link?.text && (
                <InfoLink link={data.link}>{data.link.text}</InfoLink>
              )}
            </div>
          </div>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <div className="flex flex-col justify-between bg-white">
          <MainContent badge={badge} title={title} content={content} />
          <div className="relative mb-8">
            <div className="aspect-h-9 aspect-w-16 relative">
              {image && (
                <SanityImage image={image} fill className="absolute h-full w-full object-cover" />
              )}
            </div>
          </div>
          {type === 'newsletter' && data.buttonText && (
            <NewsletterSignupForm buttonText={data.buttonText} onClose={handlePopupClose} />
          )}
          {type === 'info' && data.link?.text && (
            <InfoLink link={data.link}>{data.link.text}</InfoLink>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MainContent({
  title,
  content,
  badge
}: {
  title: string;
  content: string;
  badge?: string;
}) {
  return (
    <div className="mb-4 flex flex-col items-center gap-y-2 text-center lg:mb-0 lg:items-start lg:gap-y-4 lg:text-left">
      <div className="flex flex-col items-center gap-y-2 lg:items-start">
        {badge && (
          <div>
            <Badge size="sm">{badge}</Badge>
          </div>
        )}
        <Dialog.Title asChild>
          {title && <h2 className="text-balance text-heading-md font-bold uppercase">{title}</h2>}
        </Dialog.Title>
      </div>
      {content && (
        <Text size="sm" className="max-w-xs text-balance text-brand-mid-grey">
          {content}
        </Text>
      )}
    </div>
  );
}

function InfoLink({ link, children }: { link: LinkProps; children: React.ReactNode }) {
  return (
    <Button asChild size="sm">
      <SanityLink link={link}>{children}</SanityLink>
    </Button>
  );
}
