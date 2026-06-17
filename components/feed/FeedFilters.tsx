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
        onValueChange={(value) =>
          updateParam('tag', value === 'all' ? undefined : value)
        }
      >
        <Select.Trigger
          aria-label="Filter by tag"
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Select.Value placeholder="All tags" />
          <Select.Icon>
            <ChevronDown className="h-4 w-4" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
            <Select.Viewport className="p-1">
              <Select.Item
                value="all"
                className="flex cursor-pointer items-center justify-between rounded-sm px-3 py-1.5 text-sm text-gray-700 outline-none data-[highlighted]:bg-gray-100"
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
                  className="flex cursor-pointer items-center justify-between rounded-sm px-3 py-1.5 text-sm text-gray-700 outline-none data-[highlighted]:bg-gray-100"
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

      <div className="inline-flex rounded-md border border-gray-300 p-0.5">
        {SCORE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => updateParam('minScore', String(option.value))}
            className={cn(
              'rounded px-3 py-1 text-sm font-medium transition-colors',
              activeMinScore === option.value
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
