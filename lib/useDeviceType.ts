'use client';

import { useEffect, useState } from 'react';

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setDeviceType('mobile');
      else setDeviceType('desktop');
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = deviceType === 'desktop';

  return { isDesktop };
};
