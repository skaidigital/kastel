'use client';

import { Button } from '@/components/Button';
import { Text } from '@/components/base/Text';
import { StarRating } from '@/components/pages/ProductPage/StarRating';
import { accordionItemAnimation } from '@/lib/animations';
import { motion } from 'framer-motion';

interface Props {
  data: ReviewItemProps[];
  onClick: () => void;
  amount: number;
}

export const Items = ({ data, onClick }: Props) => {
  if (!data.length) {
    return (
      <div className="flex justify-center text-center">
        <Text size="eyebrow">Ingen anmeldelser passer dette søket</Text>
      </div>
    );
  }

  return (
    <>
      {data?.map((review, index) => {
        return <ReviewItem {...review} key={index} />;
      })}
      <Button type="button" onClick={onClick}>
        Hent flere anmeldelser
      </Button>
    </>
  );
};

export interface ReviewItemProps {
  rating: number;
  isReccommended: boolean;
  title: string;
  body: string;
  created_at: string;
  customer: {
    first_name: string;
  };
  verified_buyer: boolean;
}

const ReviewItem = ({
  rating,
  isReccommended,
  title,
  body,
  created_at,
  customer,
  verified_buyer
}: ReviewItemProps) => {
  const date = new Date(created_at);
  const formattedCreatedAt = date?.toLocaleDateString('no-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      variants={accordionItemAnimation}
      initial="hide"
      animate="show"
      className="border-brand-border border-b"
    >
      <div className="my-32 flex pb-24">
        <div className="flex-[1] flex-col gap-y-8">
          {customer?.first_name && <span>{customer.first_name}</span>}
          {verified_buyer && <span>Verified buyer</span>}
          {isReccommended && <span>Anbefalet</span>}
        </div>
        <div className="flex-[3]">
          <div className="flex justify-between">
            {rating && <StarRating rating={rating} />}
            <span className="text-paragraph-small text-brand-mid-grey">
              {formattedCreatedAt && formattedCreatedAt}
            </span>
          </div>
          <div className="flex flex-col">
            <Text size="eyebrow" className="mb-16 mt-12">
              {title}
            </Text>
            <span>{body}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
