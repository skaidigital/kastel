import { CustomLink } from '@/components/CustomLink';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { LangValues, ROUTES } from '@/data/constants';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

interface Props {
  lang: LangValues;
  pageTitle: string;
  description?: string;
  className?: string;
}

export function AccountPageHeader({ lang, pageTitle, description, className }: Props) {
  const accountString = getAccountString(lang);

  return (
    <div className={cn('mb-8 flex flex-col gap-y-2', className)}>
      <CustomLink href={ROUTES.ACCOUNT} className="flex items-center gap-x-2">
        <ChevronLeftIcon className="size-4" />
        <Text size="sm" className="text-brand-mid-grey">
          {accountString}
        </Text>
      </CustomLink>
      <Heading as="h1" size="md">
        {pageTitle}
      </Heading>
      {description && <Text className="mt-3 max-w-xl text-balance">{description}</Text>}
    </div>
  );
}

function getAccountString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Konto';
    case 'en':
      return 'Account';
    default:
      return 'Account';
  }
}
