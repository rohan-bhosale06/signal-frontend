import Link from 'next/link';
import { SearchBar } from '@/components/search/SearchBar';
import { UserMenu } from '@/components/auth/UserMenu';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-zinc-50/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 px-4 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 font-serif text-sm font-bold text-white transition-transform group-hover:scale-105 dark:bg-teal-500">
            S
          </span>
          <span className="font-serif text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Signal<span className="text-teal-600 dark:text-teal-400">/</span>Noise
          </span>
        </Link>
        <div className="order-last w-full sm:order-none sm:ml-auto sm:w-auto sm:max-w-md sm:flex-1">
          <SearchBar />
        </div>
        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
