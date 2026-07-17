export interface Tag {
  id: string;
  name: string;
}

export type ContentType =
  | 'post_mortem'
  | 'architecture_decision'
  | 'benchmark'
  | 'tutorial_advanced'
  | 'tutorial_basic'
  | 'release_announcement'
  | 'opinion'
  | 'research'
  | 'repo_highlight'
  | 'other';

export interface ArticleHighlights {
  problem: string | null;
  solution: string | null;
  whyItMatters: string | null;
  takeaways: string[];
}

export interface Article {
  id: string;
  sourceId: string;
  title: string;
  url: string;
  contentClean: string | null;
  signalScore: number | null;
  summary: string | null;
  highlights: ArticleHighlights | null;
  fluffReason: string | null;
  contentType: ContentType | null;
  publishedAt: string | null;
  scrapedAt: string;
  isProcessed: boolean;
  tags: Tag[];
}

export interface ArticleListResponse {
  data: Article[];
  total: number;
  limit: number;
  offset: number;
}

export interface SearchResponse {
  data: Article[];
  query: string;
  limit: number;
}

export interface UserPreferences {
  minSignalScore: number;
  tags: string[];
}

export interface BookmarkResponse {
  data: Article[];
  total: number;
}

