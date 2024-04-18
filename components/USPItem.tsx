import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { SanityImageProps } from '@/lib/sanity/types';

interface Props {
  title: string;
  image: SanityImageProps;
}

export function USPItem({ title, image }: Props) {
  return (
    <div className="flex flex-col items-center gap-y-1">
      <SanityImage width={40} height={40} image={image} />
      <Text size="overline-sm">{title}</Text>
    </div>
  );
}
