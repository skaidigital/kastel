import { Hero } from '@/components/Hero';
import { HeroProps } from '@/components/shared/PageBuilder/hooks';

interface PropsWithExtra extends HeroProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const HeroSection = ({ data }: Props) => {
  return <Hero data={data} />;
};
