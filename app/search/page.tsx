import { searchArticles } from '@/lib/api';
import { ArticleList } from '@/components/feed/ArticleList';
import { EmptyState } from '@/components/layout/EmptyState';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  if (!q) {
    return <EmptyState message="Enter a search term to find articles" />;
  }

  const { data } = await searchArticles(q);

  if (data.length === 0) {
    return <EmptyState message={`No results for "${q}"`} />;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-4 text-sm text-gray-500">{`${data.length} results for "${q}"`}</h1>
      <ArticleList
        articles={data}
        total={data.length}
        limit={data.length}
        offset={0}
      />
    </main>
  );
}
