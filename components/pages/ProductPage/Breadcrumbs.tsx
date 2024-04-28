import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/Breadcrumb';
import { CustomLink } from '@/components/CustomLink';
import { LangValues, ROUTES } from '@/data/constants';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@radix-ui/react-icons';

interface Props {
  productName: string;
  lang: LangValues;
  className?: string;
}

export function Breadcrumbs({ productName, lang, className }: Props) {
  const homeString = getHomeString(lang);

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        <BreadcrumbItem className="text-brand-mid-grey">
          <BreadcrumbLink asChild>
            <CustomLink href={ROUTES.HOME}>{homeString}</CustomLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRightIcon className="size-3" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">{productName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function getHomeString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Home';
    case 'no':
      return 'Hjem';
    default:
      return 'Home';
  }
}
