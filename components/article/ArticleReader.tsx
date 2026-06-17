import DOMPurify from 'isomorphic-dompurify';
import { ExternalLink } from 'lucide-react';
import { SignalScoreBadge } from '@/components/feed/SignalScoreBadge';
import { ContentTypeTag } from '@/components/feed/ContentTypeTag';
import { formatRelativeTime } from '@/lib/utils';
import type { Article } from '@/lib/types';

export function ArticleReader({ article }: { article: Article }) {
  const tags = article.tags ?? [];
  // contentClean is HTML extracted by the scraper's Readability pipeline,
  // not sanitized at the source — strip it before dangerouslySetInnerHTML.
  const sanitizedContent = article.contentClean
    ? DOMPurify.sanitize(article.contentClean)
    : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="border-b border-gray-100 pb-6">
        <div className="flex items-center gap-2">
          <SignalScoreBadge score={article.signalScore} />
          <ContentTypeTag type={article.contentType} />
          <span className="ml-auto shrink-0 text-xs text-gray-400">
            {formatRelativeTime(article.publishedAt ?? article.scrapedAt)}
          </span>
        </div>

        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-gray-900">
          {article.title}
        </h1>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-500"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Read original <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </header>

      {sanitizedContent ? (
        <div
          className="prose prose-lg prose-pre:font-mono prose-code:font-mono mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      ) : (
        <p className="mt-8 text-gray-500">
          Full content isn&apos;t available yet — read the original article
          above.
        </p>
      )}
    </main>
  );
}
