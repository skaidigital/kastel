'use client';

import { cn } from '@/lib/utils';
import { handleSetGenderClick } from './action';

interface Props {
  activeGender?: 'male' | 'female';
}

export function GenderImageButton({ activeGender = 'female' }: Props) {
  return (
    <div className="relative">
      <div className="absolute right-0 top-0 z-10 p-4">
        <div className="mb-4 flex justify-center gap-x-2">
          <button
            onClick={() => handleSetGenderClick('female')}
            className={cn(
              'flex-1 rounded-[2px] px-4  py-2',
              activeGender == 'female'
                ? 'bg-brand-primary text-white'
                : 'bg-brand-light-grey text-black'
            )}
          >
            Female
          </button>
          <button
            onClick={() => handleSetGenderClick('male')}
            className={cn(
              'flex-1 rounded-[2px] px-4 py-2',
              activeGender == 'male'
                ? 'bg-brand-primary text-white'
                : 'bg-brand-light-grey text-black'
            )}
          >
            Male
          </button>
        </div>
      </div>
    </div>
  );
}
