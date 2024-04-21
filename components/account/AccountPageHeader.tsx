import { CustomLink } from '@/components/CustomLink';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { ROUTES } from '@/data/constants';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

interface Props {
  pageTitle: string;
  description?: string;
  className?: string;
}

export function AccountPageHeader({ pageTitle, description, className }: Props) {
  return (
    <div className={cn('mb-8 flex flex-col gap-y-2', className)}>
      <CustomLink href={ROUTES.ACCOUNT} className="flex items-center gap-x-2">
        <ChevronLeftIcon className="size-4" />
        <Text size="sm" className="text-brand-mid-grey">
          Account
        </Text>
      </CustomLink>
      <Heading as="h1" size="md">
        {pageTitle}
      </Heading>
      {description && <Text className="mt-3 max-w-xl text-balance">{description}</Text>}
    </div>
  );
}
