import { Text } from '@/components/base/Text';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  htmlFor: string;
  children: ReactNode;
  description?: string;
  className?: string;
}

export const FormLabel = ({ htmlFor, children, description, className }: Props) => {
  return (
    <div className="grid">
      <Text size="sm" className="font-medium" asChild>
        <label htmlFor={htmlFor} className={cn(description ? 'mb-1' : 'mb-1.5', className)}>
          {children}
        </label>
      </Text>
      {description && (
        <Text size="xs" className="mb-1 text-brand-mid-grey">
          {description}
        </Text>
      )}
    </div>
  );
};
