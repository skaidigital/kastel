'use client';

interface Props {
  children: React.ReactNode;
}

export function ScrollToRatingsButton({ children }: Props) {
  function handleClick() {
    scrollToElement();
  }

  return <button onClick={handleClick}>{children}</button>;
}

function scrollToElement() {
  const element = document.getElementById('reviews');
  if (element) {
    element.scrollIntoView({
      block: 'center'
    });
    return;
  }
  return;
}
