export function Skeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <div className="h-5 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="ml-auto h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="mt-3 h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-2 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-1 h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-3 flex gap-2">
        <div className="h-5 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
