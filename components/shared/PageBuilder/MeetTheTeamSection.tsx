import { MeetTheTeamSectionProps } from '@/components/shared/PageBuilder/hooks';

interface PropsWithExtra extends MeetTheTeamSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const MeetTheTeamSection = ({ data }: Props) => {
  const { index, pageId, pageType, title, people, sectionSettings } = data;

  return <div>{JSON.stringify(data, null, 2)}</div>;
};
