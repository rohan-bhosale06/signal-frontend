'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  offset: number;
  limit: number;
  total: number;
}

const BUTTON_CLASSES =
  'rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:shadow-none dark:hover:bg-zinc-800';

export function Pagination({ offset, limit, total }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasPrev = offset > 0;
  const hasNext = offset + limit < total;

  if (!hasPrev && !hasNext) return null;

  function goTo(nextOffset: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('offset', String(nextOffset));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mt-8 flex items-center justify-between">
      <button
        type="button"
        onClick={() => goTo(Math.max(0, offset - limit))}
        disabled={!hasPrev}
        className={BUTTON_CLASSES}
      >
        Previous
      </button>
      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        {Math.min(offset + 1, total)}–{Math.min(offset + limit, total)} of{' '}
        {total}
      </span>
      <button
        type="button"
        onClick={() => goTo(offset + limit)}
        disabled={!hasNext}
        className={BUTTON_CLASSES}
      >
        Next
      </button>
    </div>
  );
}
