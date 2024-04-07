'use client';

import { dropdownIconAnimation } from '@/lib/animations';
import { motion } from 'framer-motion';

interface Props {
  isOpen: boolean;
}

export const AnimatedChevron = ({ isOpen }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`ml-1 h-3 w-3 shrink-0`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <motion.path
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={dropdownIconAnimation}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};
