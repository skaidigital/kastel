import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[1400px]">{children}</div>;
}
