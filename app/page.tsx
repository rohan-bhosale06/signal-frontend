import { auth } from '@clerk/nextjs/server';
import { getArticles, getUserPreferences } from '@/lib/api';
import { ArticleList } from '@/components/feed/ArticleList';
import { FeedFilters } from '@/components/feed/FeedFilters';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; minScore?: string; offset?: string }>;
}) {
  const { getToken } = await auth();
  const params = await searchParams;

  let defaultMinScore = 50;
  let defaultTag = params.tag;

  // If the user is signed in, merge their saved preferences into defaults.
  // An explicit ?tag=all means "no tag filter" and beats saved preferences —
  // without it, selecting "All tags" would just re-apply the preference.
  const token = await getToken();
  if (token) {
    const prefs = await getUserPreferences(token).catch(() => null);
    if (prefs) {
      defaultMinScore = prefs.minSignalScore;
      if (!defaultTag && prefs.tags.length > 0) {
        defaultTag = prefs.tags[0];
      }
    }
  }

  const tag = defaultTag === 'all' ? undefined : defaultTag;

  // URL params always override saved preferences
  const minScore = params.minScore ? Number(params.minScore) : defaultMinScore;
  const offset = params.offset ? Number(params.offset) : 0;

  const { data, total, limit } = await getArticles({
    tag,
    minScore,
    offset,
  });

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <FeedFilters activeTag={tag} activeMinScore={minScore} />
      <ArticleList
        articles={data}
        total={total}
        limit={limit}
        offset={offset}
      />
    </main>
  );
}
