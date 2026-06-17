import { notFound } from 'next/navigation';
import { getArticleById } from '@/lib/api';
import { ArticleReader } from '@/components/article/ArticleReader';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) notFound();

  return <ArticleReader article={article} />;
}
