'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip';
import { useCloseOnScroll } from '@/lib/hooks/useCloseOnScroll';
import { PopoverContentProps, PopoverProps, PopoverTriggerProps } from '@radix-ui/react-popover';
import { TooltipContentProps, TooltipProps, TooltipTriggerProps } from '@radix-ui/react-tooltip';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

// ? This component is used because the Radix Tooltip does not work on mobile so we use a Popover instead
// TOOD do the same for HybridDrawer that has a sheet on mobile for example
const TouchContext = createContext<boolean | undefined>(undefined);
const useTouch = () => useContext(TouchContext);

export const TouchProvider = (props: PropsWithChildren) => {
  const [isTouch, setTouch] = useState<boolean>();

  useEffect(() => {
    setTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  return <TouchContext.Provider value={isTouch} {...props} />;
};

export const HybridTooltip = (props: TooltipProps & PopoverProps) => {
  const isTouch = useTouch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useCloseOnScroll(isOpen, setIsOpen);

  return isTouch ? (
    <Popover {...props} open={isOpen} onOpenChange={setIsOpen} />
  ) : (
    <Tooltip {...props} open={isOpen} onOpenChange={setIsOpen} />
  );
};

export const HybridTooltipTrigger = (props: TooltipTriggerProps & PopoverTriggerProps) => {
  const isTouch = useTouch();

  return isTouch ? <PopoverTrigger {...props} /> : <TooltipTrigger {...props} />;
};

export const HybridTooltipContent = (props: TooltipContentProps & PopoverContentProps) => {
  const isTouch = useTouch();

  return isTouch ? <PopoverContent {...props} /> : <TooltipContent {...props} />;
};
