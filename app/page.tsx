import { getArticles } from '@/lib/api';
import { ArticleList } from '@/components/feed/ArticleList';
import { FeedFilters } from '@/components/feed/FeedFilters';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; minScore?: string; offset?: string }>;
}) {
  const params = await searchParams;
  const minScore = params.minScore ? Number(params.minScore) : 50;
  const offset = params.offset ? Number(params.offset) : 0;

  const { data, total, limit } = await getArticles({
    tag: params.tag,
    minScore,
    offset,
  });

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <FeedFilters activeTag={params.tag} activeMinScore={minScore} />
      <ArticleList
        articles={data}
        total={total}
        limit={limit}
        offset={offset}
      />
    </main>
  );
}
