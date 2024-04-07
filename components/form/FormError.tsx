import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Props {
  error: string;
}

export function FormError({ error }: Props) {
  return (
    <span
      key={error}
      className="rounded-project border border-red-600 bg-red-50 px-3 py-1 text-paragraph-lg text-red-600 dark:border-red-600 dark:text-red-600 forced-colors:border-[Mark]"
    >
      <ExclamationTriangleIcon className="-mt-0.5 mr-2 inline-block h-4 w-4" />
      {error}
    </span>
  );
}
