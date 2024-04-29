import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// TODO trenger jeg denne hvis jeg ikke
export default function Layout({ children }: Props) {
  return <div>{children}</div>;
}
