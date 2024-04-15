'use client';

import { Badge } from '@/components/Badge';
import { Button, buttonProps } from '@/components/Button';
import { Modal, ModalContent } from '@/components/Modal';
import { Sheet, SheetContent } from '@/components/Sheet';
import { Heading } from '@/components/base/Heading';
import { hasSeenPopup } from '@/components/global/Popup/actions';
import { PopupPayload } from '@/components/global/Popup/hooks';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { SanityImage } from '@/components/sanity/SanityImage';
import { getSlug } from '@/lib/sanity/getSlug';
import { useDeviceType } from '@/lib/useDeviceType';
import { XMarkIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { PortableTextBlock } from 'next-sanity';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  data: PopupPayload;
}

export function PopupLayout({ data }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { title, content, image, badge, type } = data;

  async function handlePopupClose() {
    await hasSeenPopup();
    setIsOpen(false);
  }
  const { isDesktop } = useDeviceType();

  console.log(type);

  if (isDesktop) {
    return (
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent
          size="md"
          onClose={handlePopupClose}
          label="Popup"
          className="border-none bg-transparent"
        >
          <div className="lg:max-h-auto grid max-h-dvh grid-cols-1 lg:grid-cols-2">
            <div className="relative">
              <div className="aspect-h-1 aspect-w-1 relative lg:aspect-h-4 lg:aspect-w-3">
                {image && (
                  <SanityImage
                    image={image}
                    fill
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between bg-white p-8">
              {isDesktop && (
                <Dialog.Close asChild>
                  <Button onClick={handlePopupClose} variant="ghost" size="icon" className="p-1">
                    <XMarkIcon className="size-6" />
                  </Button>
                </Dialog.Close>
              )}
              <MainContent badge={badge} title={title} content={content} />
              {type === 'newsletter' && data.buttonText && (
                <NewsletterSignupForm buttonText={data.buttonText} />
              )}
              {type === 'info' && data.link?.text && (
                <InfoLink href={getSlug(data.link)}>{data.link.text}</InfoLink>
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
          <div className="relative">
            <div className="aspect-h-1 aspect-w-1 relative">
              {image && (
                <SanityImage image={image} fill className="absolute h-full w-full object-cover" />
              )}
            </div>
          </div>
          {type === 'newsletter' && data.buttonText && (
            <NewsletterSignupForm buttonText={data.buttonText} />
          )}
          {type === 'info' && data.link?.text && (
            <InfoLink href={getSlug(data.link)}>{data.link.text}</InfoLink>
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
  content: PortableTextBlock[];
  badge?: string;
}) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col items-start gap-y-1">
        {badge && <Badge size="sm">{badge}</Badge>}
        <Dialog.Title asChild>
          {title && (
            <Heading as="h2" size="md">
              {title}
            </Heading>
          )}
        </Dialog.Title>
      </div>
      {content && <PortableTextRenderer value={content} />}
    </div>
  );
}

function NewsletterSignupForm({ buttonText }: { buttonText: string }) {
  return (
    <div className="flex flex-col gap-y-2">
      <input
        type="text"
        className="h-10 w-full border border-brand-light-grey p-3"
        placeholder="test"
      />
      <Button type="submit">{buttonText}</Button>
    </div>
  );
}

function InfoLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href || '#'} className={clsx(buttonProps(), 'mt-8 lg:mt-0')}>
      {children}
    </Link>
  );
}
