'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  offset: number;
  limit: number;
  total: number;
}

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
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      <span className="text-sm text-gray-500">
        {Math.min(offset + 1, total)}–{Math.min(offset + limit, total)} of{' '}
        {total}
      </span>
      <button
        type="button"
        onClick={() => goTo(offset + limit)}
        disabled={!hasNext}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
