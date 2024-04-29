'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

export function TestPage() {
  return (
    <div>
      <Header />
      <Content />
      <Content />
      <Content />
    </div>
  );
}

function Header() {
  const { scrollY } = useScroll();
  console.log({ scrollY });

  const [hidden, setHidden] = useState<boolean>(false);
  console.log({ hidden });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    console.log('latest', latest);

    if (latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  //   Just to test the animation. Works fine
  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
    }, 1500);
  }, []);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' }
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="sticky left-0 top-0 flex w-full items-center justify-between border-b border-brand-light-grey bg-blue-50"
    >
      <span>Item one</span>
      <span>Item two</span>
    </motion.nav>
  );
}

function Content() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return (
    <div
      className="flex h-screen flex-col items-center justify-center"
      style={{ backgroundColor: `#${randomColor}` }}
    >
      <h1 className="text-4xl font-bold">Hello, world!</h1>
    </div>
  );
}
