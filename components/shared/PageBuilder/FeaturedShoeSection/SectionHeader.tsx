import { Badge } from '@/components/Badge';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  badge?: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ title, badge, description, className }: Props) {
  return (
    <div className={cn('flex max-w-md flex-col', className)}>
      {badge && <Badge className="mb-2">{badge}</Badge>}
      {title && (
        <Heading size="xl" className={cn(description && 'mb-4')}>
          {title}
        </Heading>
      )}
      {description && <Text className="text-balance text-brand-mid-grey">{description}</Text>}
    </div>
  );
}
