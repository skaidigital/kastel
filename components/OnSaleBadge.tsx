'use client';

import { Badge } from '@/components/Badge';
import { LangValues } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function OnSaleBadge({ className }: Props) {
  const { lang } = useBaseParams();

  const onSaleString = getOnSaleString(lang);

  return <Badge className={cn(className)}>{onSaleString}</Badge>;
}

function getOnSaleString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'On sale';
    case 'no':
      return 'På salg';
    default:
      return 'On sale';
  }
}
