import { Card, CardButton, CardContent, CardTitle } from '@/components/account/Card';
import { Text } from '@/components/base/Text';
import { SmileButton } from '@/components/smile/Button';
import { getSmilePoints } from '@/components/smile/hooks';
import { SMILE_DEEP_LINKS } from '@/data/constants';

interface Props {}

// TODO make it work with a real email
export async function KastelClubCard({}: Props) {
  const email = 'petter@skaidigital.com';
  const smilePoints = await getSmilePoints(email);

  const hasPoints = smilePoints && smilePoints.length > 0;

  return (
    <Card>
      <CardContent>
        <CardTitle>Kastel Club</CardTitle>
        {hasPoints ? (
          <Text size="sm">You have {smilePoints} Kastel points!</Text>
        ) : (
          <Text size="sm" className="text-balance">
            Join Kastel Club and earn points on every purchase!
          </Text>
        )}
      </CardContent>
      <SmileButton deepLink={SMILE_DEEP_LINKS.points_activity_rules}>
        <CardButton>Learn more</CardButton>
      </SmileButton>
    </Card>
  );
}
