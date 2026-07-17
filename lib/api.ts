import type { Article, ArticleListResponse, SearchResponse, UserPreferences, BookmarkResponse } from './types';

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

export async function getRelatedArticles(
  id: string,
  limit = 3,
): Promise<Article[]> {
  const res = await fetch(`${API_BASE}/articles/${id}/related?limit=${limit}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const body = (await res.json()) as { data: Article[] };
  return body.data;
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

// --- Phase 5: Preferences ---

export async function getUserPreferences(
  token: string,
): Promise<UserPreferences> {
  const res = await fetch(`${API_BASE}/preferences`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch preferences: ${res.status}`);
  return res.json() as Promise<UserPreferences>;
}

// --- Phase 5: Bookmarks ---

export async function getBookmarks(
  token: string,
): Promise<BookmarkResponse> {
  const res = await fetch(`${API_BASE}/bookmarks`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch bookmarks: ${res.status}`);
  return res.json() as Promise<BookmarkResponse>;
}

export async function addBookmark(
  token: string,
  articleId: string,
): Promise<void> {
  const res = await fetch(`${API_BASE}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ articleId }),
  });
  if (!res.ok) throw new Error(`Failed to add bookmark: ${res.status}`);
}

export async function removeBookmark(
  token: string,
  articleId: string,
): Promise<void> {
  const res = await fetch(`${API_BASE}/bookmarks/${articleId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to remove bookmark: ${res.status}`);
}
