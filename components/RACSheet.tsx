'use client';

import {
  animate,
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform
} from 'framer-motion';
import { useState } from 'react';
import { Button, Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';

// Wrap React Aria modal components so they support framer-motion values.
const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);

const inertiaTransition = {
  type: 'inertia' as const,
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300
};

const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1]
};

const SHEET_MARGIN = 34;
const SHEET_RADIUS = 12;

const root = document.body.firstChild as HTMLElement;

export function RACSheet() {
  const [isOpen, setOpen] = useState(false);
  const h = window.innerHeight - SHEET_MARGIN;
  const y = useMotionValue(h);
  const bgOpacity = useTransform(y, [0, h], [0.4, 0]);
  const bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

  // Scale the body down and adjust the border radius when the sheet is open.
  const bodyScale = useTransform(
    y,
    [0, h],
    [(window.innerWidth - SHEET_MARGIN) / window.innerWidth, 1]
  );
  const bodyTranslate = useTransform(y, [0, h], [SHEET_MARGIN - SHEET_RADIUS, 0]);
  const bodyBorderRadius = useTransform(y, [0, h], [SHEET_RADIUS, 0]);

  useMotionValueEvent(bodyScale, 'change', (v) => (root.style.scale = `${v}`));
  useMotionValueEvent(bodyTranslate, 'change', (v) => (root.style.translate = `0 ${v}px`));
  useMotionValueEvent(bodyBorderRadius, 'change', (v) => (root.style.borderRadius = `${v}px`));

  return (
    <>
      <Button
        className="rounded border-none bg-transparent text-lg font-semibold text-blue-600 outline-none focus-visible:ring pressed:text-blue-700"
        onPress={() => setOpen(true)}
      >
        Open sheet
      </Button>
      <AnimatePresence>
        {isOpen && (
          <MotionModalOverlay
            // Force the modal to be open when AnimatePresence renders it.
            isOpen
            onOpenChange={setOpen}
            className="fixed inset-0 z-10"
            style={{ backgroundColor: bg as any }}
          >
            <MotionModal
              className="absolute bottom-0 w-full rounded-t-xl bg-white shadow-lg will-change-transform"
              initial={{ y: h }}
              animate={{ y: 0 }}
              exit={{ y: h }}
              transition={staticTransition}
              style={{
                y,
                top: SHEET_MARGIN,
                // Extra padding at the bottom to account for rubber band scrolling.
                paddingBottom: window.screen.height
              }}
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
                  setOpen(false);
                } else {
                  animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                }
              }}
            >
              {/* drag affordance */}
              <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-gray-400" />
              <Dialog className="px-4 pb-4 outline-none">
                <div className="flex justify-end">
                  <Button
                    className="mb-8 rounded border-none bg-transparent text-lg font-semibold text-blue-600 outline-none focus-visible:ring pressed:text-blue-700"
                    onPress={() => setOpen(false)}
                  >
                    Done
                  </Button>
                </div>
                <Heading slot="title" className="text-3xl mb-4 font-semibold">
                  Modal sheet
                </Heading>
                <p className="mb-4 text-lg">
                  This is a dialog with a custom modal overlay built with React Aria Components and
                  Framer Motion.
                </p>
                <p className="text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet nisl
                  blandit, pellentesque eros eu, scelerisque eros. Sed cursus urna at nunc lacinia
                  dapibus.
                </p>
              </Dialog>
            </MotionModal>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
