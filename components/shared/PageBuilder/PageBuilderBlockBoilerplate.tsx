import { HeroProps } from '@/components/shared/PageBuilder/hooks';

interface PropsWithExtra extends HeroProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const PageBuilderBlockBoilerplate = ({ data }: Props) => {
  const { index, pageId, pageType } = data;

  return <div>content</div>;
};
