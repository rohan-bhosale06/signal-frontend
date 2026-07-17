import { auth } from '@clerk/nextjs/server';
import { getBookmarks } from '@/lib/api';
import { ArticleList } from '@/components/feed/ArticleList';

export default async function BookmarksPage() {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-zinc-500 dark:text-zinc-400">
          Please sign in to view your bookmarks.
        </p>
      </main>
    );
  }

  const { data, total } = await getBookmarks(token);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        Bookmarks
      </h1>
      <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
        {total} saved article{total !== 1 ? 's' : ''}
      </p>
      <ArticleList articles={data} total={total} limit={total} offset={0} />
    </main>
  );
}
