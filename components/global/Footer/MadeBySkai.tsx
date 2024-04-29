import Link from 'next/link';

export function MadeBySkai() {
  return (
    <div className="flex items-center gap-x-1.5 text-sm">
      Made with ❤️ by{' '}
      <Link href="https://skaidigital.com" target="_blank" className="underline">
        Skai Digital
      </Link>
    </div>
  );
}
