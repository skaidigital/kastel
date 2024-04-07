import { LoadingSpinner } from '../LoadingSpinner';

export const Loader = () => {
  return (
    <div className="animate-pulse h-screen w-full bg-gray-100">
      <LoadingSpinner />
    </div>
  );
};
