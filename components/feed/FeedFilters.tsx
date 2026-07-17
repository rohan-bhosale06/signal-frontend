'use client';

import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

// TODO: replace with a real GET /tags endpoint once the backend exposes one;
// hardcoded list keeps the filter usable until then.
const AVAILABLE_TAGS = [
  'nextjs',
  'go',
  'rust',
  'typescript',
  'kubernetes',
  'postgres',
  'redis',
  'llm',
];

const SCORE_OPTIONS = [
  { label: 'All (0+)', value: 0 },
  { label: 'Mid+ (50+)', value: 50 },
  { label: 'High only (80+)', value: 80 },
];

interface FeedFiltersProps {
  activeTag?: string;
  activeMinScore: number;
}

export function FeedFilters({ activeTag, activeMinScore }: FeedFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('offset');
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <Select.Root
        value={activeTag ?? 'all'}
        // "all" is passed through explicitly (?tag=all) — deleting the param
        // would let a signed-in user's saved preference tag reassert itself.
        onValueChange={(value) => updateParam('tag', value)}
      >
        <Select.Trigger
          aria-label="Filter by tag"
          className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:shadow-none dark:hover:bg-zinc-800"
        >
          <Select.Value placeholder="All tags" />
          <Select.Icon>
            <ChevronDown className="h-4 w-4" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            <Select.Viewport className="p-1">
              <Select.Item
                value="all"
                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-sm text-zinc-700 outline-none data-[highlighted]:bg-zinc-100 dark:text-zinc-200 dark:data-[highlighted]:bg-zinc-800"
              >
                <Select.ItemText>All tags</Select.ItemText>
                <Select.ItemIndicator>
                  <Check className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
              {AVAILABLE_TAGS.map((tag) => (
                <Select.Item
                  key={tag}
                  value={tag}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-sm text-zinc-700 outline-none data-[highlighted]:bg-zinc-100 dark:text-zinc-200 dark:data-[highlighted]:bg-zinc-800"
                >
                  <Select.ItemText>{tag}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <div className="inline-flex rounded-xl border border-zinc-200 bg-white p-0.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-none">
        {SCORE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => updateParam('minScore', String(option.value))}
            className={cn(
              'rounded-lg px-3 py-1 text-sm font-medium transition-colors',
              activeMinScore === option.value
                ? 'bg-teal-600 text-white dark:bg-teal-500 dark:text-zinc-950'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
