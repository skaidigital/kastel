'use client';

import { useProductPageContext } from '@/components/pages/ProductPage/Context';

interface Props {
  children: React.ReactNode;
}

export function ScrollToRatingsButton({ children }: Props) {
  const { setShowProductReviews } = useProductPageContext();

  function handleClick() {
    setShowProductReviews(true);
    scrollToElement();
  }

  return <button onClick={handleClick}>{children}</button>;
}

function scrollToElement() {
  const element = document.getElementById('reviews');
  if (element) {
    element.scrollIntoView({
      block: 'start'
    });
    return;
  }
  return;
}
