'use client';

import { Badge } from '@/components/Badge';
import { useProductCardContext } from './Context';

interface Props {
  badges: string[];
}

export function Badges({ badges }: Props) {
  const { activeColorway } = useProductCardContext();
  const activeBadges = activeColorway?.badges || badges;
  const limtedBadges = activeBadges.slice(0, 2);

  return limtedBadges.map((badge) => (
    <Badge key={badge} className="mr-2" size="sm">
      {badge}
    </Badge>
  ));
}

export function DiscountBadge({ discount }: { discount: string }) {
  const { activeColorway } = useProductCardContext();

  const activeDiscount = activeColorway ? activeColorway.largestDiscount : discount;

  return activeDiscount && <Badge className="mr-2 text-xs lg:text-sm">-{activeDiscount}%</Badge>;
}
