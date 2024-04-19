import { portableTextBlogPostSerializer } from '@/lib/sanity/portableTextBlogPostSerializer';
import { portableTextNatureLabSerializer } from '@/lib/sanity/portableTextNatureLabSerializer';
import { portableTextSerializer } from '@/lib/sanity/portableTextSerializer';
import { PortableText, PortableTextBlock } from '@portabletext/react';

type SerializerType = 'normal' | 'blogPost' | 'natureLab';

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
    case 'blogPost':
      return portableTextBlogPostSerializer;
    case 'natureLab':
      return portableTextNatureLabSerializer;
    default:
      return portableTextSerializer;
  }
}
