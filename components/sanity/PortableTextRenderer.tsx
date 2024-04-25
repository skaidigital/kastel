import { legalPageTextSerializer } from '@/lib/sanity/legalPageTextSerializer';
import { portableTextNatureLabSerializer } from '@/lib/sanity/portableTextNatureLabSerializer';
import { portableTextSerializer } from '@/lib/sanity/portableTextSeralizer';
import { PortableText, PortableTextBlock } from '@portabletext/react';

type SerializerType = 'normal' | 'natureLab' | 'legalPage';

interface Props {
  value: PortableTextBlock[];
  type?: SerializerType;
}

export const PortableTextRenderer = ({ value, type = 'normal' }: Props) => {
  if (!value) return null;

  const components = getSerializer(type);

  return <PortableText value={value} components={components} />;
};

function getSerializer(type: SerializerType) {
  switch (type) {
    case 'normal':
      return portableTextSerializer;
    case 'natureLab':
      return portableTextNatureLabSerializer;
    case 'legalPage':
      return legalPageTextSerializer;
    default:
      return portableTextSerializer;
  }
}
