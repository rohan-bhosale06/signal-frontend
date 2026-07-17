import { notFound } from 'next/navigation';
import { getArticleById, getRelatedArticles } from '@/lib/api';
import { ArticleReader } from '@/components/article/ArticleReader';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [article, related] = await Promise.all([
    getArticleById(id),
    getRelatedArticles(id),
  ]);

  if (!article) notFound();

  return <ArticleReader article={article} related={related} />;
}
