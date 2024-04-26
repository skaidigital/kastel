import { SizeGuideProps } from '@/lib/sanity/types';

export function SizeGuide({ chart, description }: SizeGuideProps) {
  console.log(chart, description);

  return (
    <div>
      <div>Size guide</div>
      {description && <span>{description}</span>}
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200 bg-white">
          {chart?.rows?.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.cells.map((cell, cellIndex) => (
                <td
                  key={`cell-${cellIndex}`}
                  className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
