export function ConfiguratorContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex h-[calc(100vh-88px)] flex-col lg:flex-row">{children}</div>;
}
