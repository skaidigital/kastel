import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function TwoColumnRow({ children }: Props) {
  return <div className="grid grid-cols-2 gap-x-5">{children}</div>;
}
