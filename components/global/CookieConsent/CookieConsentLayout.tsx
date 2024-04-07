'use client';

import { Dictionary } from '@/app/dictionaries';
import { Button } from '@/components/Button';
import { Container } from '@/components/base/Container';
import { onAccept, onReject } from '@/components/global/CookieConsent/actions';
import { CookieConsentPayload } from '@/components/global/CookieConsent/hooks';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { bottomDrawerAnimation } from '@/lib/animations';
import { ConsentType } from '@/lib/types';
import { usePlausibleAnalytics } from '@/lib/usePlausibleAnalytics';
import { cn } from '@/lib/utils';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { EncodeDataAttributeCallback } from '@sanity/react-loader';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  data: CookieConsentPayload;
  dictionary: Dictionary;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function CookieConsentLayout({ data, dictionary, encodeDataAttribute }: Props) {
  const { content } = data;
  const { trackConsent } = usePlausibleAnalytics();

  const [isOpen, setIsOpen] = useState(true);

  function handleConsent({ type }: { type: ConsentType }) {
    if (type === 'accept') {
      onAccept();
      trackConsent({ type });
    }
    if (type === 'reject') {
      onReject();
      trackConsent({ type });
    }
    setIsOpen(false);
  }

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AnimatePresence>
        {isOpen && (
          <AlertDialog.Portal forceMount>
            <AlertDialog.Content asChild forceMount aria-label="Cookie consent">
              <motion.div
                variants={bottomDrawerAnimation}
                initial="hide"
                animate={isOpen ? 'show' : 'hide'}
                exit="hide"
                className={cn(
                  'fixed bottom-0 z-50 w-full rounded-project border-t  border-brand-border bg-white px-5 py-10 lg:p-10'
                )}
              >
                <Container className="flex max-w-md flex-col gap-10 lg:max-w-[1540px] lg:flex-row">
                  <div className="grow">
                    {content && (
                      <div className="*:mt-0 lg:max-w-3xl">
                        <PortableTextRenderer
                          data-sanity={encodeDataAttribute?.(['cookieConsent'])}
                          value={content}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-2 xl:flex-row">
                    <AlertDialog.Action asChild>
                      <Button
                        variant="primary"
                        className="w-full whitespace-nowrap lg:w-auto"
                        onClick={() => handleConsent({ type: 'accept' })}
                      >
                        {dictionary.cookie_consent.accept}
                      </Button>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel asChild>
                      <Button
                        variant="secondary"
                        onClick={() => handleConsent({ type: 'reject' })}
                        className="w-full whitespace-nowrap xl:w-fit"
                      >
                        Opt out
                      </Button>
                    </AlertDialog.Cancel>
                  </div>
                </Container>
              </motion.div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
}
