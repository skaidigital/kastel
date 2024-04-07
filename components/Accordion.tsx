'use client';

import { cn } from '@/lib/utils';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ReactNode } from 'react';

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
  return (
    <RadixAccordion.Root type="multiple" className={cn('divide-y divide-brand-border', className)}>
      {children}
    </RadixAccordion.Root>
  );
}

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  return (
    <RadixAccordion.Item value={title}>
      <RadixAccordion.Trigger className="group flex w-full items-center justify-between py-2">
        {title}
        <ChevronDownIcon className="var(--smooth-bezier) h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </RadixAccordion.Trigger>
      <RadixAccordion.Content className="will-change-[transform,opacity] data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down">
        <div className="pb-4 pt-2">{children}</div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
}
