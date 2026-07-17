'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import Link from 'next/link';

interface BookmarkButtonProps {
  articleId: string;
}

export function BookmarkButton({ articleId }: BookmarkButtonProps) {
  const { bookmarkedIds, toggleBookmark, isLoading, isSignedIn } =
    useBookmarks();

  const isBookmarked = bookmarkedIds.has(articleId);

  if (!isSignedIn) {
    return (
      <Link
        href="/sign-in"
        className="relative z-10 text-zinc-300 transition-colors hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-400"
        title="Sign in to bookmark"
      >
        <Bookmark className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(articleId)}
      disabled={isLoading}
      // z-10 keeps the button clickable above the card's stretched link overlay
      className={`relative z-10 transition-colors ${
        isBookmarked
          ? 'text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300'
          : 'text-zinc-300 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-400'
      }`}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </button>
  );
}
