import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export const TwoColumnRow = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col space-y-5 md:flex-row md:justify-between md:space-x-5 md:space-y-0">
      {children}
    </div>
  );
};

export const TwoColumnRowItem = ({ children }: { children: ReactNode }) => {
  return <div className="flex-1">{children}</div>;
};

export const OneColumnRow = ({ children }: { children: ReactNode }) => {
  return <div className="w-full">{children}</div>;
};

import { FormProps, Form as RACForm } from 'react-aria-components';

export function Form(props: FormProps) {
  return <RACForm {...props} className={cn('flex flex-col gap-5', props.className)} />;
}
