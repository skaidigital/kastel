import { PageTitleProps } from '@/components/shared/PageBuilder/hooks';

interface PropsWithExtra extends PageTitleProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const PageTitle = ({ data }: Props) => {
  const { index, pageId, pageType, title, description } = data;

  console.log({ title });
  console.log(description);

  return <div>Page title</div>;
};
