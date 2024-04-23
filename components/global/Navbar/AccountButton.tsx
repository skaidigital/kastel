import { CustomLink } from '@/components/CustomLink';
import { ROUTES } from '@/data/constants';

export const AccountButton = () => {
  return (
    <CustomLink href={ROUTES.ACCOUNT} aria-label="Go to account" className="text-sm">
      Account
    </CustomLink>
  );
};
