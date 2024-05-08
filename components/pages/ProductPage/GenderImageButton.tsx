'use client';

import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { GenderContext } from './ProductGallery';

export function GenderImageButton() {
  // const { activeGender, setActiveGender } = useContext(GenderContext);
  const context = useContext(GenderContext);

  if (!context) {
    console.error('GenderImageButton must be used within a GenderContext.Provider');
    return <div>Error: GenderImageButton must be used within a GenderContext.Provider</div>;
  }

  const { activeGender, setActiveGender } = context;
  console.log(activeGender);

  function handleChangeGender(gender: 'male' | 'female') {
    console.log('setting gender ', gender);

    setActiveGender(gender);
  }

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 z-10 p-4">
        <div className="mb-4 flex justify-center gap-x-2">
          <button
            onClick={() => handleChangeGender('female')}
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
            onClick={() => handleChangeGender('male')}
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
