'use client';

// interface FilterButtonProps {
//     text?: string;
//     urlKey?: string;
//     url

export function FilterButton({ text }: { text: string }) {
  function handleOnClick() {
    console.log('clicked');
  }

  return (
    <button className="" onClick={() => handleOnClick()}>
      {text}
    </button>
  );
}
