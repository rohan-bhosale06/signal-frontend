import { ArticleCard } from './ArticleCard';
import { EmptyState } from '@/components/layout/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import type { Article } from '@/lib/types';

interface ArticleListProps {
  articles: Article[];
  total: number;
  limit: number;
  offset: number;
}

export function ArticleList({
  articles,
  total,
  limit,
  offset,
}: ArticleListProps) {
  if (articles.length === 0) {
    return <EmptyState message="No articles match these filters yet." />;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <Pagination offset={offset} limit={limit} total={total} />
    </>
  );
}
