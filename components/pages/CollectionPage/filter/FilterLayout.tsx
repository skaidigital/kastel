export function FilterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[350px] p-6">
      <div className="flex justify-between border-b-[1px] border-stone-200">
        <h3>Filter</h3>
        <span>x</span>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}
