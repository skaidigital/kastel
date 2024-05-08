'use client';

interface Props {
  children: React.ReactNode;
}

export function ScrollToRatingsButton({ children }: Props) {
  return <button onClick={scrollToElement}>{children}</button>;
}

function scrollToElement() {
  const element = document.getElementById('reviews');
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    return;
  }
  return;
}
