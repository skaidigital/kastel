import { portableTextNatureLabSerializer } from '@/lib/sanity/portableTextNatureLabSerializer';
import { portableTextSerializer } from '@/lib/sanity/portableTextSeralizer';
import { PortableText, PortableTextBlock } from '@portabletext/react';

interface Props {
  value: PortableTextBlock[];
  type?: 'normal' | 'natureLab';
}

export const PortableTextRenderer = ({ value, type = 'normal' }: Props) => {
  if (!value) return null;

  const components = type === 'normal' ? portableTextSerializer : portableTextNatureLabSerializer;

  return <PortableText value={value} components={components} />;
};
