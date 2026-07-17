import Link from 'next/link';
import {
  ExternalLink,
  AlertTriangle,
  Wrench,
  Lightbulb,
  FileText,
  Compass,
  Timer,
} from 'lucide-react';
import { SignalScoreBadge } from '@/components/feed/SignalScoreBadge';
import { ContentTypeTag } from '@/components/feed/ContentTypeTag';
import { formatRelativeTime } from '@/lib/utils';
import type { Article, ContentType } from '@/lib/types';

// "Problem / Solution" reads oddly on non-incident content — adapt the
// section labels to what the article actually is.
const SECTION_LABELS: Partial<
  Record<ContentType, { problem: string; solution: string }>
> = {
  repo_highlight: { problem: 'What it is', solution: 'Why it stands out' },
  benchmark: { problem: 'What was tested', solution: 'Key results' },
  release_announcement: { problem: "What's new", solution: 'What it enables' },
  architecture_decision: { problem: 'The Challenge', solution: 'The Approach' },
  research: { problem: 'The Question', solution: 'The Findings' },
  tutorial_advanced: { problem: 'The Goal', solution: 'The Approach' },
  tutorial_basic: { problem: 'The Goal', solution: 'The Approach' },
  opinion: { problem: 'The Claim', solution: 'The Reasoning' },
};

const WORDS_PER_MINUTE = 200;

function readingTimeMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).length / WORDS_PER_MINUTE));
}

export function ArticleReader({
  article,
  related = [],
}: {
  article: Article;
  related?: Article[];
}) {
  const tags = article.tags ?? [];
  const highlights = article.highlights;
  const hasHighlights =
    highlights &&
    (highlights.problem || highlights.solution || highlights.takeaways.length > 0);

  const labels =
    (article.contentType && SECTION_LABELS[article.contentType]) || {
      problem: 'The Problem',
      solution: 'The Solution',
    };

  const fullMinutes = article.contentClean
    ? readingTimeMinutes(article.contentClean)
    : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div className="flex flex-wrap items-center gap-2">
          <SignalScoreBadge score={article.signalScore} />
          <ContentTypeTag type={article.contentType} />
          {hasHighlights && fullMinutes && fullMinutes > 1 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              <Timer className="h-3 w-3" />
              {fullMinutes} min article &rarr; 1 min brief
            </span>
          )}
          <span className="ml-auto shrink-0 text-xs text-zinc-400 dark:text-zinc-500">
            {formatRelativeTime(article.publishedAt ?? article.scrapedAt)}
          </span>
        </div>

        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-50">
          {article.title}
        </h1>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
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
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700 transition-colors hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
        >
          Read original <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </header>

      {/* TL;DR */}
      {article.summary && (
        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
            TL;DR
          </h2>
          <p className="mt-2 text-base leading-relaxed text-zinc-800 dark:text-zinc-200">
            {article.summary}
          </p>
        </section>
      )}

      {/* Why it matters */}
      {highlights?.whyItMatters && (
        <section className="mt-4 flex items-start gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-950/40">
          <Compass className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
          <p className="text-sm leading-relaxed text-violet-900 dark:text-violet-200">
            <span className="font-semibold">Why it matters: </span>
            {highlights.whyItMatters}
          </p>
        </section>
      )}

      {hasHighlights ? (
        <div className="mt-8 space-y-8">
          {highlights.problem && (
            <section>
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" /> {labels.problem}
              </h2>
              <p className="mt-2 border-l-2 border-amber-300 pl-4 text-base leading-relaxed text-zinc-800 dark:border-amber-700 dark:text-zinc-200">
                {highlights.problem}
              </p>
            </section>
          )}

          {highlights.solution && (
            <section>
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                <Wrench className="h-4 w-4" /> {labels.solution}
              </h2>
              <p className="mt-2 border-l-2 border-emerald-300 pl-4 text-base leading-relaxed text-zinc-800 dark:border-emerald-700 dark:text-zinc-200">
                {highlights.solution}
              </p>
            </section>
          )}

          {highlights.takeaways.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-400">
                <Lightbulb className="h-4 w-4" /> Key Takeaways
              </h2>
              <ul className="mt-3 space-y-3">
                {highlights.takeaways.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                      {i + 1}
                    </span>
                    <span className="text-base leading-relaxed text-zinc-800 dark:text-zinc-200">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      ) : (
        !article.summary && (
          <p className="mt-8 text-zinc-500 dark:text-zinc-400">
            Highlights aren&apos;t available yet — this article is still in the
            AI processing queue. Read the original above.
          </p>
        )
      )}

      {/* Full extracted text, collapsed by default */}
      {article.contentClean && (
        <details className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200">
            <FileText className="h-4 w-4" /> Show full extracted article
            {fullMinutes && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                ({fullMinutes} min read)
              </span>
            )}
          </summary>
          <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            {article.contentClean}
          </p>
        </details>
      )}

      {/* More like this */}
      {related.length > 0 && (
        <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
            More like this
          </h2>
          <div className="mt-4 space-y-3">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/article/${rel.id}`}
                className="block rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none dark:hover:border-zinc-700"
              >
                <div className="flex items-center gap-2">
                  <SignalScoreBadge score={rel.signalScore} />
                  <ContentTypeTag type={rel.contentType} />
                </div>
                <h3 className="mt-2 font-medium leading-snug text-zinc-900 dark:text-zinc-100">
                  {rel.title}
                </h3>
                {rel.summary && (
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {rel.summary}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
