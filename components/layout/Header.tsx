import Link from 'next/link';
import { SearchBar } from '@/components/search/SearchBar';

export function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-4 px-4 py-4">
        <Link
          href="/"
          className="font-serif text-lg font-bold tracking-tight text-gray-900"
        >
          Signal-to-Noise
        </Link>
        <div className="w-full sm:ml-auto sm:w-auto sm:max-w-md sm:flex-1">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
