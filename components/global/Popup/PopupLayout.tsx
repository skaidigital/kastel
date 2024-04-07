'use client';

import { Button, buttonProps } from '@/components/Button';
import { Modal, ModalContent } from '@/components/Modal';
import { TouchTarget } from '@/components/TouchTarget';
import { Heading } from '@/components/base/Heading';
import { hasSeenPopup } from '@/components/global/Popup/actions';
import { PopupPayload } from '@/components/global/Popup/hooks';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { SanityImage } from '@/components/sanity/SanityImage';
import { getSlug } from '@/lib/sanity/getSlug';
import { XMarkIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import { EncodeDataAttributeCallback } from '@sanity/react-loader';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  data: PopupPayload;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function PopupLayout({ data, encodeDataAttribute }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { title, link, content, image } = data;

  const href = getSlug(link);

  async function handlePopupClose() {
    await hasSeenPopup();
    setIsOpen(false);
  }

  const isClient = typeof window !== 'undefined';

  const isMobile = isClient && window.innerWidth < 768;

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
              {/* <AspectRatio ratio={isMobile ? 1 : 3 / 4} className="relative"> */}
              {image && (
                <SanityImage
                  image={image}
                  fill
                  data-sanity={encodeDataAttribute?.(['popup', 'image'])}
                  // className="absolute h-full w-full"
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
              )}
            </div>
            {isMobile && (
              <div className="absolute right-0 top-0 m-2 bg-white bg-opacity-50">
                <Dialog.Close asChild>
                  <Button onClick={handlePopupClose} variant="ghost" size="icon">
                    <TouchTarget>
                      <XMarkIcon className="h-4 w-4" />
                    </TouchTarget>
                  </Button>
                </Dialog.Close>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between bg-white p-8">
            <div>
              <div className="flex items-center justify-between">
                <Dialog.Title asChild>
                  {title && (
                    <Heading
                      as="h2"
                      size="md"
                      data-sanity={encodeDataAttribute?.(['popup', 'title'])}
                    >
                      {title}
                    </Heading>
                  )}
                </Dialog.Title>
                {!isMobile && (
                  <Dialog.Close asChild>
                    <Button onClick={handlePopupClose} variant="ghost" size="icon" className="p-1">
                      <XMarkIcon className="size-6" />
                    </Button>
                  </Dialog.Close>
                )}
              </div>
              {content && <PortableTextRenderer value={content} />}
            </div>
            {link.text && (
              <Link
                href={href || '#'}
                className={clsx(buttonProps(), 'mt-8 lg:mt-0')}
                data-sanity={encodeDataAttribute?.(['popup', 'link'])}
              >
                {link.text}
              </Link>
            )}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
