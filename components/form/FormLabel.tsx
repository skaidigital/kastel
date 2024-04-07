import { textProps } from '@/components/base/Text';
import { ReactNode } from 'react';

interface Props {
  htmlFor: string;
  children: ReactNode;
}

export const FormLabel = ({ htmlFor, children }: Props) => {
  return (
    <label htmlFor={htmlFor} className={textProps({ size: 'eyebrow' })}>
      {children}
    </label>
  );
};
