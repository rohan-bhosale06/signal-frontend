import type { Article, ArticleListResponse, SearchResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

interface GetArticlesParams {
  tag?: string;
  minScore?: number;
  limit?: number;
  offset?: number;
}

export async function getArticles(
  params: GetArticlesParams = {},
): Promise<ArticleListResponse> {
  const query = new URLSearchParams();
  if (params.tag) query.set('tag', params.tag);
  if (params.minScore !== undefined) {
    query.set('minScore', String(params.minScore));
  }
  query.set('limit', String(params.limit ?? 20));
  query.set('offset', String(params.offset ?? 0));

  const res = await fetch(`${API_BASE}/articles?${query.toString()}`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) throw new Error(`Failed to fetch articles: ${res.status}`);
  return res.json() as Promise<ArticleListResponse>;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const res = await fetch(`${API_BASE}/articles/${id}`, {
    next: { revalidate: 300 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch article: ${res.status}`);
  return res.json() as Promise<Article>;
}

export async function searchArticles(
  q: string,
  limit = 10,
): Promise<SearchResponse> {
  const query = new URLSearchParams({ q, limit: String(limit) });
  const res = await fetch(`${API_BASE}/articles/search?${query.toString()}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json() as Promise<SearchResponse>;
}
