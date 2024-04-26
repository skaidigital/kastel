'use client';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { CustomLink } from '@/components/CustomLink';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Logo } from '@/components/Logo';
import { Modal, ModalContent } from '@/components/Modal';
import { Sheet, SheetContent } from '@/components/Sheet';
import { Text } from '@/components/base/Text';
import { hasSeenPopup } from '@/components/global/Popup/actions';
import { PopupPayload } from '@/components/global/Popup/hooks';
import { SanityImage } from '@/components/sanity/SanityImage';
import { subscribeToNewsletter } from '@/components/shared/NewsletterSignup/actions';
import { getSlug } from '@/lib/sanity/getSlug';
import { useDeviceType } from '@/lib/useDeviceType';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface Props {
  data: PopupPayload;
  klaviyoListId: string;
}

// TODO translate the messages
// TODO vertically center the loading spinner
export function PopupLayout({ data, klaviyoListId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { title, content, image, badge, type } = data;

  async function handlePopupClose() {
    await hasSeenPopup();
    setIsOpen(false);
  }
  const { isDesktop } = useDeviceType();

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
                <NewsletterSignupForm
                  buttonText={data.buttonText}
                  onClose={handlePopupClose}
                  klaviyoListId={klaviyoListId}
                />
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
          <div className="relative mb-8">
            <div className="aspect-h-9 aspect-w-16 relative">
              {image && (
                <SanityImage image={image} fill className="absolute h-full w-full object-cover" />
              )}
            </div>
          </div>
          {type === 'newsletter' && data.buttonText && (
            <NewsletterSignupForm
              buttonText={data.buttonText}
              onClose={handlePopupClose}
              klaviyoListId={klaviyoListId}
            />
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

const formValidator = z.object({
  email: z.string().email()
});

type FormProps = z.infer<typeof formValidator>;

function NewsletterSignupForm({
  buttonText,
  onClose,
  klaviyoListId
}: {
  buttonText: string;
  onClose: () => void;
  klaviyoListId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit } = useForm<FormProps>({
    mode: 'onBlur',
    resolver: zodResolver(formValidator),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: FormProps) => {
    startTransition(async () => {
      const response = await subscribeToNewsletter({
        email: data.email,
        klaviyoId: klaviyoListId
      });

      onClose();
      if (response.success) {
        toast.success('You have successfully signed up for our newsletter!', {
          description: 'Please check your inbox for a confirmation email.'
        });
        return;
      }
      toast.error('There was an error signing up for our newsletter. Please try again later.');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-y-2">
      <input
        {...register('email')}
        autoComplete="email"
        type="Email"
        className="w-full rounded-[2px] border border-brand-light-grey bg-brand-sand p-3 text-sm font-medium text-brand-mid-grey placeholder:text-sm placeholder:font-medium placeholder:text-brand-mid-grey"
        placeholder="test"
      />
      <Button type="submit" size="sm" className="relative">
        <span className={isPending ? 'opacity-0' : ''}> {buttonText}</span>
        {isPending && (
          <LoadingSpinner className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </Button>
    </form>
  );
}

function InfoLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Button asChild size="sm">
      <CustomLink href={href}>{children}</CustomLink>
    </Button>
  );
}
