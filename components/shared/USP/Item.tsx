import { Text } from '@/components/base/Text';
import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
}

export function Item({ icon, title, description }: Props) {
  return (
    <div className="flex max-w-xs flex-col items-center space-y-3 text-center">
      {icon}
      <Text size="eyebrow">{title}</Text>
      <Text>{description}</Text>
    </div>
  );
}
