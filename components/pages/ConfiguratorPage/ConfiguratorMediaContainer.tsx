export function ConfiguratorMediaContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-[--product-bg-color] lg:h-auto">
      {children}
    </div>
  );
}
