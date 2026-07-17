import Link from 'next/link';
import { SignalScoreBadge } from './SignalScoreBadge';
import { ContentTypeTag } from './ContentTypeTag';
import { BookmarkButton } from './BookmarkButton';
import { formatRelativeTime } from '@/lib/utils';
import type { Article } from '@/lib/types';

const MAX_VISIBLE_TAGS = 4;

export function ArticleCard({ article }: { article: Article }) {
  const tags = article.tags ?? [];
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const remaining = tags.length - visibleTags.length;

  return (
    <article className="group relative rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80">
      <div className="flex items-center gap-2">
        <SignalScoreBadge score={article.signalScore} />
        <ContentTypeTag type={article.contentType} />
        <time className="ml-auto shrink-0 text-xs text-zinc-400 dark:text-zinc-500">
          {formatRelativeTime(article.publishedAt ?? article.scrapedAt)}
        </time>
        <BookmarkButton articleId={article.id} />
      </div>

      <h2 className="mt-3 font-serif text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
        <Link
          href={`/article/${article.id}`}
          className="transition-colors after:absolute after:inset-0 group-hover:text-teal-700 dark:group-hover:text-teal-400"
        >
          {article.title}
        </Link>
      </h2>

      {article.summary && (
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {article.summary}
        </p>
      )}

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag.name}
            </span>
          ))}
          {remaining > 0 && (
            <span className="px-2 py-0.5 text-xs text-zinc-400 dark:text-zinc-500">
              +{remaining} more
            </span>
          )}
        </div>
      )}
    </article>
  );
}
