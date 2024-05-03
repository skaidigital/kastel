import { Section } from '@/components/pages/KastelClubPage/Section';
import { KastelClubPagePayload } from '@/components/pages/KastelClubPage/hooks';

interface Props {
  data: KastelClubPagePayload;
}

export async function KastelClubPage({ data }: Props) {
  const { waysToEarn } = data;
  console.log(JSON.stringify(waysToEarn));

  return (
    <div className="my-20 flex flex-col gap-y-20 lg:gap-y-40">
      {waysToEarn && <Section section={waysToEarn} />}
    </div>
  );
}
