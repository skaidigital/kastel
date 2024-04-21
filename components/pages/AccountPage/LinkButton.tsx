import { CustomLink } from '@/components/CustomLink';
import { Text } from '@/components/base/Text';

interface Props {
  icon: React.ReactNode;
  title: string;
  href: string;
}

export function LinkButton({ icon, title, href }: Props) {
  return (
    <CustomLink
      href={href}
      className="flex items-center justify-center rounded-[4px] border border-brand-light-grey bg-brand-sand py-8"
    >
      <span className="flex items-center gap-x-1">
        {icon}
        <Text size="sm" className="font-medium text-brand-mid-grey">
          {title}
        </Text>
      </span>
    </CustomLink>
  );
}
