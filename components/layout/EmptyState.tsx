import { Inbox } from 'lucide-react';

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-200 px-4 py-16 text-center dark:border-zinc-800">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
        <Inbox className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
      </span>
      <p className="text-zinc-500 dark:text-zinc-400">{message}</p>
    </div>
  );
}
