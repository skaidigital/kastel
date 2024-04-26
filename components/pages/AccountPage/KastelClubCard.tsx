import { Card, CardButton, CardContent, CardTitle } from '@/components/account/Card';
import { Text } from '@/components/base/Text';
import { SmileButton } from '@/components/smile/Button';
import { getSmilePoints } from '@/components/smile/hooks';
import { LangValues, SMILE_DEEP_LINKS } from '@/data/constants';

interface Props {
  lang: LangValues;
}

// TODO make it work with a real email
// TODO figure out why lang is set and then is undefined
export async function KastelClubCard({ lang }: Props) {
  const email = 'petter@skaidigital.com';
  const smilePoints = await getSmilePoints(email);

  const hasPoints = smilePoints && smilePoints.length > 0;

  const learnMoreString = getLearnMoreString(lang);
  const youHaveString = getYouHaveString(lang);
  const joinString = getJoinString(lang);

  console.log('lang in KastelClubCard:', lang);

  return (
    <Card>
      <CardContent>
        <CardTitle>Kastel Club</CardTitle>
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
      <SmileButton deepLink={SMILE_DEEP_LINKS.points_activity_rules}>
        <CardButton>{learnMoreString}</CardButton>
      </SmileButton>
    </Card>
  );
}

function getLearnMoreString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Les mer';
    case 'en':
      return 'Learn more';
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
      return 'Bli med i Kastel Club og tjen poeng på hver handel!';
    case 'en':
      return 'Join Kastel Club and earn points on every purchase!';
    default:
      return 'Join Kastel Club and earn points on every purchase!';
  }
}
