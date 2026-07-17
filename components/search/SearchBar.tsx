'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Search } from 'lucide-react';

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 3;

export function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (value.trim().length < MIN_QUERY_LENGTH) return;

    setIsSearching(true);
    const timer = setTimeout(() => {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
      setIsSearching(false);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length > 0) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search architecture decisions, post-mortems, benchmarks..."
        className="w-full rounded-xl border border-zinc-200 bg-white py-1.5 pl-9 pr-9 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:shadow-none dark:placeholder:text-zinc-500 dark:focus:border-teal-500"
      />
      {isSearching && (
        <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-zinc-400 dark:text-zinc-500" />
      )}
    </form>
  );
}
