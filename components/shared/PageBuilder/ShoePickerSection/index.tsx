import { ShoePickerLayout } from '@/components/shared/PageBuilder/ShoePickerSection/Layout';
import { ShoePickerProps } from '@/components/shared/PageBuilder/hooks';
import { COOKIE_NAMES } from '@/data/constants';
import { cookies } from 'next/headers';

interface PropsWithExtra extends ShoePickerProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const ShoePickerSection = ({ data }: Props) => {
  const { index, pageId, pageType, title, types, sectionSettings } = data;

  const activeTypeName =
    cookies().get(COOKIE_NAMES.SHOE_PICKER_ACTIVE_TYPE_NAME)?.value || types[0]?.title;
  const activeType = types.find((type) => type.title === activeTypeName);

  if (!activeTypeName || !activeType) {
    return null;
  }

  return (
    <ShoePickerLayout
      title={title}
      types={types}
      activeType={activeType}
      activeTypeName={activeTypeName}
      sectionSettings={sectionSettings}
      index={index}
      pageId={pageId}
      pageType={pageType}
    />
  );
};
