interface Props {
  children: React.ReactNode;
}

export function TouchTarget({ children }: Props) {
  return (
    <>
      {children}
      <span
        aria-hidden="true"
        className="size[max(100%,2.75rem)] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
      />
    </>
  );
}
