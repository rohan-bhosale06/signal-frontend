import { CONTENT_TYPE_LABELS } from '@/lib/utils';
import type { ContentType } from '@/lib/types';

export function ContentTypeTag({ type }: { type: ContentType | null }) {
  if (!type) return null;

  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
      {CONTENT_TYPE_LABELS[type] ?? type}
    </span>
  );
}
