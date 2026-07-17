'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { addBookmark, removeBookmark, getBookmarks } from '@/lib/api';
import type { BookmarkResponse } from '@/lib/types';

export function useBookmarks() {
  const { getToken, isSignedIn } = useAuth();
  const queryClient = useQueryClient();

  const bookmarksQuery = useQuery<BookmarkResponse>({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      return getBookmarks(token);
    },
    enabled: !!isSignedIn,
  });

  const bookmarkedIds = new Set(
    bookmarksQuery.data?.data.map((a) => a.id) ?? [],
  );

  const addMutation = useMutation({
    mutationFn: async (articleId: string) => {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      return addBookmark(token, articleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (articleId: string) => {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      return removeBookmark(token, articleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });

  function toggleBookmark(articleId: string) {
    if (bookmarkedIds.has(articleId)) {
      removeMutation.mutate(articleId);
    } else {
      addMutation.mutate(articleId);
    }
  }

  return {
    bookmarkedIds,
    toggleBookmark,
    isLoading: addMutation.isPending || removeMutation.isPending,
    isSignedIn: !!isSignedIn,
  };
}
