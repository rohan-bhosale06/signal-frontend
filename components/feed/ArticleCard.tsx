import Link from 'next/link';
import { SignalScoreBadge } from './SignalScoreBadge';
import { ContentTypeTag } from './ContentTypeTag';
import { formatRelativeTime } from '@/lib/utils';
import type { Article } from '@/lib/types';

const MAX_VISIBLE_TAGS = 4;

export function ArticleCard({ article }: { article: Article }) {
  const tags = article.tags ?? [];
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const remaining = tags.length - visibleTags.length;

  return (
    <article className="rounded-lg border border-gray-100 p-4 transition-colors hover:border-gray-200">
      <div className="flex items-center gap-2">
        <SignalScoreBadge score={article.signalScore} />
        <ContentTypeTag type={article.contentType} />
        <time className="ml-auto shrink-0 text-xs text-gray-400">
          {formatRelativeTime(article.publishedAt ?? article.scrapedAt)}
        </time>
      </div>

      <h2 className="mt-3 font-serif text-lg font-semibold leading-snug text-gray-900">
        <Link href={`/article/${article.id}`} className="hover:underline">
          {article.title}
        </Link>
      </h2>

      {article.summary && (
        <p className="mt-1.5 line-clamp-2 text-sm text-gray-500">
          {article.summary}
        </p>
      )}

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-500"
            >
              {tag.name}
            </span>
          ))}
          {remaining > 0 && (
            <span className="px-2 py-0.5 text-xs text-gray-400">
              +{remaining} more
            </span>
          )}
        </div>
      )}
    </article>
  );
}
