import { Card, CardButton, CardContent, CardTitle } from '@/components/account/Card';
import { Text } from '@/components/base/Text';
import { SmileButton } from '@/components/pages/AccountPage/SmileButton';
import { getSmilePoints } from '@/components/smile/hooks';
import { LangValues } from '@/data/constants';

interface Props {
  lang: LangValues;
}

export async function KastelClubCard({ lang }: Props) {
  const smilePoints = await getSmilePoints();

  const hasPoints = smilePoints && smilePoints.length > 0;

  const learnMoreString = getLearnMoreString(lang);
  const youHaveString = getYouHaveString(lang);
  const joinString = getJoinString(lang);

  return (
    <Card>
      <CardContent>
        <CardTitle>Kastel Klubb</CardTitle>
        {hasPoints ? (
          <Text size="sm">
            {youHaveString} {smilePoints} Kastel points!
          </Text>
        ) : (
          <Text size="sm" className="text-balance">
            {joinString}
          </Text>
        )}
      </CardContent>
      <SmileButton>
        <CardButton>{learnMoreString}</CardButton>
      </SmileButton>
    </Card>
  );
}

function getLearnMoreString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Se belønninger';
    case 'en':
      return 'See rewards';
    default:
      return 'Learn more';
  }
}

function getYouHaveString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Du har';
    case 'en':
      return 'You have';
    default:
  }
}

function getJoinString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Du er med i Kastel Klubb og vil tjen poeng på hver handel!';
    case 'en':
      return 'Your in Kastel Club and will earn points on every purchase!';
    default:
      return 'Join Kastel Club and earn points on every purchase!';
  }
}
