import { CONTENT_TYPE_LABELS } from '@/lib/utils';
import type { ContentType } from '@/lib/types';

export function ContentTypeTag({ type }: { type: ContentType | null }) {
  if (!type) return null;

  return (
    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
      {CONTENT_TYPE_LABELS[type] ?? type}
    </span>
  );
}
