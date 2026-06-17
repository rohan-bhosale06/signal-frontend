'use client';

import { useQuery } from '@tanstack/react-query';
import { getArticles } from '@/lib/api';
import type { ArticleListResponse } from '@/lib/types';

interface UseArticlesParams {
  tag?: string;
  minScore?: number;
  limit?: number;
  offset?: number;
}

export function useArticles(params: UseArticlesParams = {}) {
  return useQuery<ArticleListResponse>({
    queryKey: ['articles', params],
    queryFn: () => getArticles(params),
  });
}
