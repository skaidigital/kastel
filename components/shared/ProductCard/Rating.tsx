interface Props {
  sku: string;
}

export async function Rating({ sku }: Props) {
  return (
    <div className="@[320px]:botttom-4 absolute bottom-3 right-3 text-xs @[320px]:right-4 @[320px]:text-sm">
      ✨4.0 (2466)
    </div>
  );
}

export function RatingFallback() {
  return (
    <div className="@[320px]:botttom-4 absolute bottom-3 right-3 text-xs @[320px]:right-4 @[320px]:text-sm">
      ✨4.9 (2466)
    </div>
  );
}
